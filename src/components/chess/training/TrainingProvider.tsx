import Tree from "@/lib/chess/Tree";
import TreeNode from "@/lib/chess/TreeNode";
import { dbg, getRandomItemFromArray } from "@/lib/helpers";
import { Directory } from "@prisma/client";
import { Chess } from "chess.js";
import { cloneDeep } from "lodash";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Piece, Square } from "react-chessboard/dist/chessboard/types";

enum TrainingState {
  wait_user_move,
  trainer_answers,
}
interface TrainingContextInterface {
  directory: Directory;
  tree: Tree;
  game: Chess;
  node: TreeNode;
  onDrop: (sourceSquare: Square, targetSquare: Square, piece: Piece) => boolean;
  isStart: boolean;
  isEndOfBranch: boolean;
  isWaitingForUserMove: boolean;
  isTrainerAnswers: boolean;
  trainerAnswer: boolean | undefined;
  stats: TypeStats;
  wrongNodes: TreeNode[];
}

const Context = createContext<TrainingContextInterface | undefined>(undefined);

type Props = Readonly<{
  context: {
    directory: Directory;
  };
  children: React.ReactNode;
}>;

type TypeStats = {
  nbOk: number;
  nbKo: number;
};

const TrainingProvider = ({ context, children }: Props) => {
  const { directory } = context;

  const initTree = useMemo(() => {
    const tree = new Tree(directory);
    // console.log("initTree:", tree);
    return tree;
  }, [directory]);

  const initGame = useMemo(() => {
    return new Chess(directory.fenPosInit);
  }, [directory]);

  const [tree] = useState<Tree>(initTree);
  const [node, setNode] = useState<TreeNode>(tree.root);
  const [game, setGame] = useState<Chess>(initGame);
  const [trainingState, setTrainingState] = useState<TrainingState>(
    TrainingState.wait_user_move
  );
  const [trainerAnswer, setTrainerAnswer] = useState<boolean | undefined>();
  const [currentTimeout, setCurrentTimeout] = useState<number | undefined>();
  const [stats, setStats] = useState<TypeStats>({
    nbOk: 0,
    nbKo: 0,
  });
  const [wrongNodes, setWrongNodes] = useState<TreeNode[]>([]);

  function safeGameMutate(modify: (game: Chess) => void) {
    setGame((game: Chess) => {
      const gameCpy = cloneDeep(game);
      modify(gameCpy);
      return gameCpy;
    });
  }

  function makeRandomMove(nodes: TreeNode[]) {
    const randomNode = getRandomItemFromArray(nodes) as TreeNode;

    // dbg.debug("computer plays: " + randomNode.move?.san);
    safeGameMutate((game: Chess) => {
      const move = game.move(randomNode.move?.san);
      // console.log({ move });
    });
    setNode(randomNode);
    setTrainingState(TrainingState.wait_user_move);
    // clearTimeout(currentTimeout);
  }

  function onDrop(sourceSquare: Square, targetSquare: Square, piece: Piece) {
    try {
      const statsCpy = cloneDeep(stats);
      const gameCpy = cloneDeep(game);

      const move = gameCpy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? "q",
      });

      const isMoveInDirectory = node.hasMove(move.san);

      if (isMoveInDirectory) {
        statsCpy.nbOk++;
        const childNode = node.getChildBySan(move.san);

        const newTimeout = window.setTimeout(() => {
          if (childNode?.hasChildren()) {
            makeRandomMove(childNode.children);
          }
        }, 1000);

        setNode(childNode as TreeNode);
        setCurrentTimeout(newTimeout);
      } else {
        statsCpy.nbKo++;
        gameCpy.undo();
        setWrongNodes((wrongNodes: TreeNode[]) => {
          wrongNodes.push(node);
          return wrongNodes;
        });
      }

      setStats(statsCpy);
      setGame(gameCpy);
      setTrainerAnswer(isMoveInDirectory);
      setTrainingState(TrainingState.trainer_answers);
    } catch (error) {
      console.log({ error });
      return false;
    }

    return true;
  }

  const ctx: TrainingContextInterface = {
    game,
    node,
    tree,
    directory,
    onDrop,
    isStart: !node.parentNode,
    isEndOfBranch: !node.hasChildren(),
    isWaitingForUserMove: trainingState === TrainingState.wait_user_move,
    isTrainerAnswers: trainingState === TrainingState.trainer_answers,
    trainerAnswer,
    stats,
    wrongNodes,
  };

  return <Context value={ctx}>{children}</Context>;
};

export function useTraining() {
  return useContext(Context) as TrainingContextInterface;
}

export default TrainingProvider;
