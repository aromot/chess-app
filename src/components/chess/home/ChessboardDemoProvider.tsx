import Tree from "@/lib/chess/Tree";
import TreeNode from "@/lib/chess/TreeNode";
import { dbg, getRandomInt, getRandomItemFromArray } from "@/lib/helpers";
import { Directory } from "@prisma/client";
import { Chess } from "chess.js";
import { cloneDeep } from "lodash";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface DemoContextInterface {
  game: Chess;
  directory: Directory;
  node: TreeNode;
  isUserTurn: boolean;
  status: DemoStatus;
  userHasPlayed: boolean;
  userCheckSuccess: boolean;
  userCheckError: boolean;
  opponentHasPlayed: boolean;
  opponentCheckDone: boolean;
}

export enum DemoStatus {
  idle,
  user_played,
  user_check_success,
  user_check_error,
  user_try_again,
  opponent_played,
  opponent_check_done,
  end_of_variation,
}

const Context = createContext<DemoContextInterface | undefined>(undefined);

type Props = Readonly<{
  directory: Directory;
  children: React.ReactNode;
}>;

function getRandomMove(rightMove: string, wrongMoves: string[]) {
  // Generate the possible moves to pick a random one.
  const len = wrongMoves.length;

  // pour avoir 50% de chance d'avoir le bon move
  for (let i = 0; i < len; i++) {
    wrongMoves.push(rightMove);
  }
  return getRandomItemFromArray(wrongMoves);
}

const ChessboardDemoProvider = ({ directory, children }: Props) => {
  const initTree = useMemo(() => new Tree(directory), [directory]);
  const initGame = useMemo(() => new Chess(initTree.posInit.fen), [initTree]);

  const [tree] = useState<Tree>(initTree);
  const [node, setNode] = useState<TreeNode>(tree.root);
  const [game, setGame] = useState<Chess>(initGame);
  const [status, setStatus] = useState<DemoStatus>(DemoStatus.idle);

  const resetGame = useCallback(() => {
    const gameCpy = cloneDeep(game);
    gameCpy.reset();
    setNode(tree.root);
    setGame(gameCpy);
    setStatus(DemoStatus.idle);
  }, [tree, game]);

  const getTimeout = useCallback(() => {
    switch (status) {
      case DemoStatus.idle:
        return 1000;
      case DemoStatus.user_played:
        return 300;
      case DemoStatus.user_check_success:
      case DemoStatus.user_check_error:
        return 1000;
      case DemoStatus.user_try_again:
        return 1000;
      case DemoStatus.opponent_played:
        return 200;
      case DemoStatus.opponent_check_done:
      case DemoStatus.end_of_variation:
      default:
        return 3000;
    }
  }, [status]);

  const makeUserMove = useCallback(() => {
    if (!node.hasChildren()) {
      setStatus(DemoStatus.end_of_variation);
      return;
    }

    const randomNode = getRandomItemFromArray(node.children) as TreeNode;
    if (!randomNode.move) {
      throw new Error("Node has no child!");
    }
    const gameCpy = cloneDeep(game);

    const move = getRandomMove(randomNode.move.san, gameCpy.moves());
    gameCpy.move(move);

    setGame(gameCpy);
    setStatus(DemoStatus.user_played);
  }, [node, game]);

  const checkUserMove = useCallback(() => {
    const history = [...game.history()];

    const lastMove = history.pop();
    if (!lastMove) {
      throw new Error("No last move???");
    }
    if (node.hasMove(lastMove)) {
      setNode(node.getChildBySan(lastMove) as TreeNode);
      setStatus(DemoStatus.user_check_success);
    } else {
      setStatus(DemoStatus.user_check_error);
    }
  }, [game, node]);

  const undoUserMove = useCallback(() => {
    const gameCpy = cloneDeep(game);

    gameCpy.undo();

    setGame(gameCpy);
    setStatus(DemoStatus.user_try_again);
  }, [game]);

  const makeOpponentMove = useCallback(() => {
    if (!node.hasChildren()) {
      setStatus(DemoStatus.end_of_variation);
      return;
    }

    const childNode = getRandomItemFromArray<TreeNode>(node.children);
    if (!childNode.move) {
      throw new Error("Node doesn't have a move (opponent move).");
    }
    const gameCpy = cloneDeep(game);
    gameCpy.move(childNode.move.san);

    setNode(childNode);
    setGame(gameCpy);
    setStatus(DemoStatus.opponent_played);
  }, [node, game]);

  const checkOpponentMove = () => {
    setStatus(DemoStatus.opponent_check_done);
  };

  useEffect(() => {
    // const timeout = node.hasChildren() ? getRandomInt(1000, 1800) : getRandomInt(1500, 3000);
    const timeout = getTimeout();
    const newTimeout = window.setTimeout(() => {
      switch (status) {
        case DemoStatus.idle:
        case DemoStatus.opponent_check_done:
        case DemoStatus.user_try_again:
          makeUserMove();
          break;

        case DemoStatus.user_played:
          checkUserMove();
          break;

        case DemoStatus.user_check_success:
          makeOpponentMove();
          break;

        case DemoStatus.user_check_error:
          undoUserMove();
          break;

        case DemoStatus.opponent_played:
          checkOpponentMove();
          break;

        case DemoStatus.end_of_variation:
          resetGame();
          break;
      }
    }, timeout);

    return () => {
      clearTimeout(newTimeout);
    };
  }, [
    status,
    makeUserMove,
    checkUserMove,
    getTimeout,
    makeOpponentMove,
    undoUserMove,
    resetGame,
  ]);

  const ctx: DemoContextInterface = {
    game,
    directory,
    node,
    status,
    userHasPlayed: status === DemoStatus.user_played,
    userCheckSuccess: status === DemoStatus.user_check_success,
    userCheckError: status === DemoStatus.user_check_error,
    opponentHasPlayed: status === DemoStatus.opponent_played,
    opponentCheckDone: status === DemoStatus.opponent_check_done,
    isUserTurn: directory.white
      ? node.move?.color === "w"
      : node.move?.color === "b",
  };

  return <Context value={ctx}>{children}</Context>;
};

export function useChessboardDemo() {
  return useContext(Context) as DemoContextInterface;
}

export default ChessboardDemoProvider;
