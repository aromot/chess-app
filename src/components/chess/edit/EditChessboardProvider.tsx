import { Directory, Move } from "@prisma/client";
import { Chess, Color } from "chess.js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import cloneDeep from "lodash/cloneDeep";
import { addMove } from "@/app/(private)/positions/_actions/actions";
import { Piece, Square } from "react-chessboard/dist/chessboard/types";
import Tree from "@/lib/chess/Tree";
import TreeNode from "@/lib/chess/TreeNode";
import { BreakpointType, getCurrentBreakpoint } from "@/lib/helpers";
import { SquareSet } from "../common/types";
import { move2piece } from "../common/helpers";
import { audios } from "../common/audios";

interface ChessboardContextInterface {
  directory: Directory;
  tree: Tree;
  game: Chess;
  node: TreeNode;
  onDrop: (
    sourceSquare: Square,
    targetSquare: Square,
    piece: Piece
  ) => Promise<boolean>;
  onClickReset: () => void;
  onClickBackward: () => void;
  onClickForward: () => void;
  onClickGoToNode: (node: TreeNode) => void;
  isStart: boolean;
  isEndOfBranch: boolean;
  openModalDeleteBranch: (move: Move) => void;
  modalDelBranchOpen: boolean;
  toggleModalDeleteBranch: (open: boolean) => void;
  closeModalDeleteBranch: () => void;
  moveDelete: Move | undefined;
  removeBranch: (move: Move) => void;
  // handleKeyDown: (event: KeyboardEvent) => void;
  userColor: Color;
  isUserTurn: boolean;
  breakpoint: BreakpointType | undefined;
  onSquareClick: (square: Square) => void;
  moveSquares: SquareSet;
  optionSquares: SquareSet;
  rightClickedSquares: SquareSet;
  moveTo: Square | null;
  onSquareRightClick: (square: Square) => void;
  onPromotionPieceSelect: (piece: Piece) => Promise<boolean>;
  showPromotionDialog: boolean;
}

const Context = createContext<ChessboardContextInterface | undefined>(
  undefined
);

type Props = Readonly<{
  directory: Directory;
  children: React.ReactNode;
}>;

const EditChessboardProvider = ({ directory, children }: Props) => {
  const initTree = useMemo(() => {
    const tree = new Tree(directory);
    // console.log("initTree:", tree);
    return tree;
  }, [directory]);

  const initGame = useMemo(() => {
    return new Chess(directory.fenPosInit);
  }, [directory]);

  const [modalDelBranchOpen, setModalDelBranchOpen] = useState<boolean>(false);
  const [moveDelete, setMoveDelete] = useState<Move | undefined>();
  const [game, setGame] = useState<Chess>(initGame);
  const [tree] = useState<Tree>(initTree);
  const [node, setNode] = useState<TreeNode>(tree.root);
  const [breakpoint, setBreakpoint] = useState<BreakpointType | undefined>();
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [moveTo, setMoveTo] = useState<Square | null>(null);
  const [moveSquares, setMoveSquares] = useState<SquareSet>({});
  const [optionSquares, setOptionSquares] = useState<SquareSet>({});
  const [rightClickedSquares, setRightClickedSquares] = useState<SquareSet>({});
  const [showPromotionDialog, setShowPromotionDialog] =
    useState<boolean>(false);

  const openModalDeleteBranch = (move: Move) => {
    setMoveDelete(move);
    setModalDelBranchOpen(true);
  };
  const closeModalDeleteBranch = () => {
    setMoveDelete(undefined);
    setModalDelBranchOpen(false);
  };
  const toggleModalDeleteBranch = (open: boolean) =>
    setModalDelBranchOpen(open);

  async function onDrop(
    sourceSquare: Square,
    targetSquare: Square,
    piece: Piece
  ) {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? "q",
      });

      if (move.captured) {
        audios.capture.play();
      } else {
        audios.move.play();
      }

      setGame((game) => cloneDeep(game));

      // A partir de la position courante, on cherche si le move enfant existe déjà
      const isExistingMove = node.hasMove(move.san);

      if (isExistingMove) {
        const childNode = node.getChildBySan(move.san);

        setNode(childNode as TreeNode);
      } else {
        const [newPosition, newMove] = await addMove(
          directory.id,
          move.color,
          move.san,
          move.after,
          move.from,
          move.to,
          node.position.id
        );
        const newNode = node.add(newMove, newPosition);
        setNode(newNode);
      }
    } catch (error) {
      console.log({ error });
      return false;
    }

    return true;
  }

  function getMoveOptions(square: Square) {
    const moves = game.moves({
      square,
      verbose: true,
    });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }
    const newSquares: SquareSet = {};
    moves.map((move) => {
      const moveTo = game.get(move.to);
      newSquares[move.to] = {
        background:
          moveTo && moveTo.color !== game.get(square)?.color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
      return move;
    });
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };
    setOptionSquares(newSquares);
    return true;
  }

  async function onSquareClick(square: Square) {
    setRightClickedSquares({});

    // from square
    if (!moveFrom) {
      const hasMoveOptions = getMoveOptions(square);
      if (hasMoveOptions) setMoveFrom(square);
      return;
    }

    // to square
    if (moveTo) {
      return;
    }

    // check if valid move before showing dialog
    const moves = game.moves({
      square: moveFrom,
      verbose: true,
    });

    const foundMove = moves.find((m) => m.from === moveFrom && m.to === square);

    // not a valid move
    if (!foundMove) {
      // check if clicked on new piece
      const hasMoveOptions = getMoveOptions(square);
      // if new piece, setMoveFrom, otherwise clear moveFrom
      setMoveFrom(hasMoveOptions ? square : null);
      return;
    }

    // valid move
    setMoveTo(square);

    const piece = move2piece(foundMove);

    // if promotion move
    if (
      (foundMove.color === "w" &&
        foundMove.piece === "p" &&
        square[1] === "8") ||
      (foundMove.color === "b" && foundMove.piece === "p" && square[1] === "1")
    ) {
      setShowPromotionDialog(true);
      return;
    }

    // is normal move
    await onDrop(foundMove.from, foundMove.to, piece);
    // const gameCopy = cloneDeep(game);
    // const move = gameCopy.move({
    //   from: moveFrom,
    //   to: square,
    //   promotion: "q",
    // });

    // if invalid, setMoveFrom and getMoveOptions
    // if (move === null) {
    //   const hasMoveOptions = getMoveOptions(square);
    //   if (hasMoveOptions) setMoveFrom(square);
    //   return;
    // }
    // setGame(gameCopy);
    // setTimeout(makeRandomMove, 300);
    setMoveFrom(null);
    setMoveTo(null);
    setOptionSquares({});
  }

  function onSquareRightClick(square: Square) {
    const colour = "rgba(0, 0, 255, 0.4)";
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square] &&
        rightClickedSquares[square].backgroundColor === colour
          ? undefined
          : {
              backgroundColor: colour,
            },
    });
  }

  async function onPromotionPieceSelect(piece: Piece) {
    // if no piece passed then user has cancelled dialog, don't make move and reset
    if (piece) {
      // const gameCopy = {
      //   ...game,
      // };
      // gameCopy.move({
      //   from: moveFrom,
      //   to: moveTo,
      //   promotion: piece[1].toLowerCase() ?? "q",
      // });
      // setGame(gameCopy);
      // setTimeout(makeRandomMove, 300);

      await onDrop(moveFrom, moveTo, piece);
    }
    setMoveFrom(null);
    setMoveTo(null);
    setShowPromotionDialog(false);
    setOptionSquares({});
    return true;
  }

  const onClickReset = useCallback(() => {
    game.reset();
    setGame((game) => cloneDeep(game));
    setNode(tree.root);
    setMoveSquares({});
    setOptionSquares({});
    setRightClickedSquares({});
  }, [game, tree]);

  const onClickForward = useCallback(() => {
    const nextNode = node.getNextNode();

    if (!nextNode) {
      alert("Il n'y a pas de prochain coup (fin de la branche).");
      throw new Error("Il n'y a pas de prochain coup (fin de la branche).");
    }

    if (!nextNode.move) {
      alert(
        "Erreur, comment un noeud de l'arbre ne peut pas avoir de move ???"
      );
      throw new Error("Le noeud de l'arbre n'a pas de move.");
    }

    game.move(nextNode.move.san);
    audios.move.play();
    setGame((game) => cloneDeep(game));
    setNode(nextNode);
    setMoveSquares({});
    setOptionSquares({});
    setRightClickedSquares({});
  }, [game, node]);

  const onClickBackward = useCallback(() => {
    if (!node.parentNode) {
      alert("Vous êtes déjà au début du répertoire.");
      throw new Error("Vous êtes déjà au début du répertoire.");
    }

    const parentNode = node.parentNode as TreeNode;

    game.undo();
    audios.move.play();
    setGame((game) => cloneDeep(game));
    setNode(parentNode);
    setMoveSquares({});
    setOptionSquares({});
    setRightClickedSquares({});
  }, [game, node]);

  const onClickGoToNode = (node: TreeNode) => {
    const parentNodes = node.getParentNodes();
    parentNodes.shift(); // on supprime le noeud racine du tableau

    // on reset le game...
    game.reset();
    // et on parcourt les noeuds pour jouer chaque coup jusqu'à la position du coup demandé.
    parentNodes.forEach((node: TreeNode) => {
      if (node.move) {
        game.move(node.move.san);
      }
    });
    if (node.move) {
      game.move(node.move.san);
    }
    setGame((game) => cloneDeep(game));
    audios.move.play();

    setNode(node);
  };

  const removeBranch = (move: Move) => {
    setNode((node: TreeNode) => {
      node.removeBranch(move);
      return node;
    });
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.defaultPrevented) {
        return; // Ne devrait rien faire si l'événement de la touche était déjà consommé.
      }

      try {
        switch (event.key) {
          case "ArrowUp":
            onClickReset();
            break;
          case "ArrowLeft":
            onClickBackward();
            break;
          case "ArrowRight":
            onClickForward();
            break;
        }

        // Annuler l'action par défaut pour éviter qu'elle ne soit traitée deux fois.
        event.preventDefault();
      } catch (error) {
        console.log("Error while processing keyboard event.");
        console.log(error);
      }
    },
    [onClickReset, onClickBackward, onClickForward]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    setBreakpoint(getCurrentBreakpoint());
  }, []);

  const userColor: Color = directory.white ? "w" : "b";

  const ctx: ChessboardContextInterface = {
    game,
    node,
    tree,
    directory,
    onDrop,
    onClickReset,
    onClickBackward,
    onClickForward,
    onClickGoToNode,
    isStart: !node.parentNode,
    isEndOfBranch: !node.hasChildren(),
    openModalDeleteBranch,
    modalDelBranchOpen,
    toggleModalDeleteBranch,
    closeModalDeleteBranch,
    moveDelete,
    removeBranch,
    // handleKeyDown,
    userColor,
    isUserTurn: game.turn() === userColor,
    breakpoint,
    onSquareClick,
    moveSquares,
    optionSquares,
    rightClickedSquares,
    moveTo,
    onSquareRightClick,
    onPromotionPieceSelect,
    showPromotionDialog,
  };

  return <Context value={ctx}>{children}</Context>;
};

export function useChessboard() {
  return useContext(Context) as ChessboardContextInterface;
}

export default EditChessboardProvider;
