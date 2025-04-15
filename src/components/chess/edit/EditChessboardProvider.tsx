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

// const audios = {
//   move: new Audio("/move.mp3"),
//   capture: new Audio("/capture.webm"),
// };

interface ChessboardContextInterface {
  directory: Directory;
  tree: Tree;
  game: Chess;
  node: TreeNode;
  // position: Position;
  // lastMove: Move | null;
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
  handleKeyDown: (event: KeyboardEvent) => void;
  userColor: Color;
  isUserTurn: boolean;
  breakpoint: BreakpointType | undefined;
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

      // audios.move.play();

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

  const onClickReset = useCallback(() => {
    // audios.move.play();
    game.reset();
    setGame((game) => cloneDeep(game));
    setNode(tree.root);
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
    // audios.move.play();
    setGame((game) => cloneDeep(game));
    setNode(nextNode);
    // setPosition(nextNode.position);
    // setLastMove(nextNode.move);
  }, [node, game]);

  const onClickBackward = useCallback(() => {
    if (!node.parentNode) {
      alert("Vous êtes déjà au début du répertoire.");
      throw new Error("Vous êtes déjà au début du répertoire.");
    }

    const parentNode = node.parentNode as TreeNode;

    game.undo();
    // audios.move.play();
    setGame((game) => cloneDeep(game));
    setNode(parentNode);
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
    // audios.move.play();

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

        document.removeEventListener("keydown", handleKeyDown);
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
    handleKeyDown,
    userColor,
    isUserTurn: game.turn() === userColor,
    breakpoint,
  };

  return <Context value={ctx}>{children}</Context>;
};

export function useChessboard() {
  return useContext(Context) as ChessboardContextInterface;
}

export default EditChessboardProvider;
