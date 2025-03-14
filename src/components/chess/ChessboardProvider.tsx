import { Directory, Move, Position } from "@prisma/client";
import { Chess } from "chess.js";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import { addMove } from "@/app/positions/_actions/actions";
import { Piece, Square } from "react-chessboard/dist/chessboard/types";
import Tree from "@/lib/chess/Tree";
import TreeNode from "@/lib/chess/TreeNode";

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
}

const Context = createContext<ChessboardContextInterface | undefined>(
  undefined
);

const ChessboardProvider = ({
  context,
  children,
}: Readonly<{
  context: {
    directory: Directory;
  };
  children: React.ReactNode;
}>) => {
  const { directory } = context;

  const initTree = useMemo(() => {
    const tree = new Tree(directory);
    console.log("initTree:", tree);
    return tree;
  }, [directory]);

  const [game, setGame] = useState<Chess>(new Chess(directory.fenPosInit));
  const [tree] = useState<Tree>(initTree);
  const [node, setNode] = useState<TreeNode>(tree.root);
  const [position, setPosition] = useState<Position>(tree.posInit);
  const [lastMove, setLastMove] = useState<Move | null>(null);

  // const onClickForward = useCallback(() => {
  const onClickForward = () => {
    const nextNode = node.getNextNode();

    if (!nextNode) {
      alert("Il n'y a pas de prochain coup (fin de la branche).");
      return;
    }

    if (!nextNode.move) {
      alert(
        "Erreur, comment un noeud de l'arbre ne peut pas avoir de move ???"
      );
      return;
    }

    game.move(nextNode.move.san);
    setGame((game) => cloneDeep(game));
    setNode(nextNode);
    setPosition(nextNode.position);
    setLastMove(nextNode.move);
  };
  // }, [node, game, position, lastMove]);

  const handleKeyDown = (event: KeyboardEvent) => {
    // if (event.defaultPrevented) {
    //   return; // Ne devrait rien faire si l'événement de la touche était déjà consommé.
    // }
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
    // event.preventDefault();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  async function onDrop(sourceSquare, targetSquare, piece) {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? "q",
      });

      setGame((game) => cloneDeep(game));

      // A partir de la position courante, on cherche si le move enfant existe déjà
      const isExistingMove = node.hasMove(move.san);

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

  const onClickReset = () => {
    game.reset();
    setGame((game) => cloneDeep(game));
    setNode(tree.root);
    setPosition(tree.root.position);
    setLastMove(tree.root.move);
  };

  const onClickBackward = () => {
    if (!lastMove) {
      alert("Vous êtes déjà au début du répertoire.");
      return;
    }

    game.undo();
    setGame((game) => cloneDeep(game));

    const parentNode = node.parentNode as TreeNode;
    setNode(parentNode);
    setPosition(parentNode?.position);
    setLastMove(parentNode?.move);
  };

  const onClickGoToNode = (node: TreeNode) => {
    const parentNodes = node.getParentNodes();
    parentNodes.shift(); // on supprime le noeud racine du tableau

    // on reset le game...
    game.reset();
    // et on parcourt les noeuds pour jouer chaque coup jusqu'à la position du coup demandé.
    parentNodes.forEach((node: TreeNode) => {
      game.move(node.move.san);
    });
    game.move(node.move.san);
    setGame((game) => cloneDeep(game));

    setNode(node);
    setPosition(node.position);
    setLastMove(node.move);
  };

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
  };

  return <Context value={ctx}>{children}</Context>;
};

export function useChessboard() {
  return useContext(Context) as ChessboardContextInterface;
}

export default ChessboardProvider;
