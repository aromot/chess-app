"use client";

import { Chessboard as ReactChessboard } from "react-chessboard";
import defaultBoardStyle from "../common/defaultBoardStyle";
import { Directory } from "@prisma/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Tree from "@/lib/chess/Tree";
import { Chess } from "chess.js";
import TreeNode from "@/lib/chess/TreeNode";
import { getRandomItemFromArray } from "@/lib/helpers";
import { cloneDeep } from "lodash";

const ChessboardDemo = ({ directory }: { directory: Directory }) => {
  const initTree = useMemo(() => {
    const tree = new Tree(directory);
    // console.log("initTree:", tree);
    return tree;
  }, [directory]);

  const initGame = useMemo(() => {
    return new Chess(initTree.posInit.fen);
  }, [initTree]);

  const [tree] = useState<Tree>(initTree);
  const [node, setNode] = useState<TreeNode>(tree.root);
  const [game, setGame] = useState<Chess>(initGame);
  const [currentTimeout, setCurrentTimeout] = useState<number | undefined>();

  function safeGameMutate(modify: (game: Chess) => void) {
    setGame((game: Chess) => {
      const gameCpy = cloneDeep(game);
      modify(gameCpy);
      return gameCpy;
    });
  }

  const makeRandomMove = useCallback(
    (nodes: TreeNode[]) => {
      const randomNode = getRandomItemFromArray(nodes) as TreeNode;

      // dbg.debug("computer plays: " + randomNode.move?.san);
      safeGameMutate((game: Chess) => {
        const move = game.move(randomNode.move?.san);
        // console.log({ move });
      });
      setNode(randomNode);
      // setTrainingState(TrainingState.wait_user_move);
      clearTimeout(currentTimeout);
    },
    [currentTimeout]
  );

  useEffect(() => {
    const newTimeout = window.setTimeout(() => {
      if (node.hasChildren()) {
        makeRandomMove(node.children);
      }
    }, 3000);
    // setCurrentTimeout(newTimeout);

    return () => {
      clearTimeout(currentTimeout);
    };
  }, [node, makeRandomMove, currentTimeout]);

  return <Chessboard directory={directory} game={game} />;
};

const Chessboard = ({
  directory,
  game,
}: {
  directory: Directory;
  game: Chess;
}) => {
  return (
    <ReactChessboard
      id="chessboard"
      position={game.fen()}
      // onPieceDrop={onDrop}
      boardOrientation={directory.white ? "white" : "black"}
      customBoardStyle={defaultBoardStyle}
      areArrowsAllowed={true}
      // customArrows={[["e2", "e4", "#444444"]]}
    />
  );
};

export default ChessboardDemo;
