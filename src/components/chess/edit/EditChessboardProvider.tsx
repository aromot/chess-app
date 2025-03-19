import { Directory, Move, Position } from "@prisma/client";
import { Chess } from "chess.js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
// import cloneDeep from "lodash/cloneDeep";
import { addMove } from "@/app/positions/_actions/actions";
import { Piece, Square } from "react-chessboard/dist/chessboard/types";
import Tree from "@/lib/chess/Tree";
import TreeNode from "@/lib/chess/TreeNode";
import { cloneDeep } from "lodash";

// const audios = {
//   move: new Audio("/move.mp3"),
//   capture: new Audio("/capture.webm"),
// };

interface ChessboardContextInterface {
  directory: Directory;
  tree: Tree;
  game: Chess;
  node: TreeNode;
  position: Position;
  lastMove: Move | null;
  onDrop: (sourceSquare: Square, targetSquare: Square, piece: Piece) => boolean;
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
}

const Context = createContext<ChessboardContextInterface | undefined>(
  undefined
);

type Props = Readonly<{
  context: {
    directory: Directory;
  };
  children: React.ReactNode;
}>;

const EditChessboardProvider = ({ context, children }: Props) => {
  const { directory } = context;

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
  const [position, setPosition] = useState<Position>(tree.posInit);
  const [lastMove, setLastMove] = useState<Move | null>(null);

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
      console.log({ move });

      if (isExistingMove) {
        console.log(
          "LE MOVE EXISTE DEJA à partir de cette position:",
          move.san
        );

        const childNode = node.getChildBySan(move.san);

        setNode(childNode as TreeNode);
        setPosition(childNode?.position as Position);
        setLastMove(childNode?.move as Move);
      } else {
        console.log("NOUVEAU MOVE à partir de cette position:", move.san);

        const [newPosition, newMove] = await addMove(
          directory.id,
          move.san,
          move.after,
          position.id
        );
        console.log({ newPosition, newMove });
        const newNode = node.add(newMove, newPosition);
        setNode(newNode);
        setPosition(newPosition as Position);
        setLastMove(newMove as Move);
      }
    } catch (error) {
      console.log({ error });
      return false;
    }

    // store timeout so it can be cleared on undo/reset so computer doesn't execute move
    // const newTimeout = setTimeout(makeRandomMove, 200);
    // setCurrentTimeout(newTimeout);
    return true;
  }

  const onClickReset = useCallback(() => {
    // audios.move.play();
    game.reset();
    setGame((game) => cloneDeep(game));
    setNode(tree.root);
    setPosition(tree.root.position);
    setLastMove(tree.root.move);
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
    setPosition(nextNode.position);
    setLastMove(nextNode.move);
  }, [node, game]);

  const onClickBackward = useCallback(() => {
    if (!lastMove) {
      alert("Vous êtes déjà au début du répertoire.");
      throw new Error("Vous êtes déjà au début du répertoire.");
    }

    const parentNode = node.parentNode as TreeNode;

    if (!parentNode) {
      alert("Il n'y a pas de position parente dans le répertoire.");
      throw new Error("Il n'y a pas de position parente dans le répertoire.");
    }

    game.undo();
    // audios.move.play();
    setGame((game) => cloneDeep(game));
    setNode(parentNode);
    setPosition(parentNode.position);
    setLastMove(parentNode.move);
  }, [game, lastMove, node]);

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
    setPosition(node.position);
    setLastMove(node.move);
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

  const ctx: ChessboardContextInterface = {
    game,
    node,
    tree,
    position,
    lastMove,
    directory,
    onDrop,
    onClickReset,
    onClickBackward,
    onClickForward,
    onClickGoToNode,
    isStart: !lastMove,
    isEndOfBranch: !node.hasChildren(),
    openModalDeleteBranch,
    modalDelBranchOpen,
    toggleModalDeleteBranch,
    closeModalDeleteBranch,
    moveDelete,
    removeBranch,
    handleKeyDown,
  };

  return <Context value={ctx}>{children}</Context>;
};

export function useChessboard() {
  return useContext(Context) as ChessboardContextInterface;
}

export default EditChessboardProvider;
