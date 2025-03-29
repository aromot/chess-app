import Line from "@/lib/chess/Line";
import Tree from "@/lib/chess/Tree";
import TreeNode from "@/lib/chess/TreeNode";
import { dbg, getRandomItemFromArray } from "@/lib/helpers";
import { Directory } from "@prisma/client";
import { Chess, Color } from "chess.js";
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
  userColor: "w" | "b";
  opponentColor: "w" | "b";
  tree: Tree;
  game: Chess;
  node: TreeNode;
  onDrop: (sourceSquare: Square, targetSquare: Square, piece: Piece) => boolean;
  isStart: boolean;
  isEndOfBranch: boolean;
  isWaitingForUserMove: boolean;
  isTrainerAnswers: boolean;
  trainingState: TrainingState;
  trainerAnswer: boolean | undefined;
  stats: TypeStats;
  wrongNodes: TreeNode[];
  reset: () => void;
  modalResultIsOpen: boolean;
  openModalResult: () => void;
  closeModalResult: () => void;
}

const Context = createContext<TrainingContextInterface | undefined>(undefined);

type Props = Readonly<{
  context: {
    directory: Directory;
    positionId: number | null;
  };
  children: React.ReactNode;
}>;

type TypeStats = {
  nbOk: number;
  nbKo: number;
};

const OPPONENT_SPEED = 1000;
const initStats: TypeStats = {
  nbOk: 0,
  nbKo: 0,
};

const TrainingProvider = ({ context, children }: Props) => {
  const { directory, positionId } = context;

  const userColor = useMemo(() => {
    return directory.white ? "w" : "b";
  }, [directory]);
  const opponentColor = useMemo(() => {
    return directory.white ? "b" : "w";
  }, [directory]);
  const initTree = useMemo(() => {
    const tree = new Tree(directory, positionId);
    // console.log("initTree:", tree);
    return tree;
  }, [directory, positionId]);

  const initGame = useMemo(() => {
    return new Chess(initTree.posInit.fen);
  }, [initTree]);

  const initLines = useMemo(() => {
    const _lines: Line[] = [];
    initTree.traverseBF((node) => {
      if (!node.hasChildren()) {
        const nodes = node.getParentNodes();
        nodes.shift(); // remove root node.
        const line = new Line(nodes.concat(node));
        _lines.push(line);
      }
    });

    _lines.forEach((line) => {
      const sequence = line.nodes
        .map((node) => {
          return node.move?.san;
        })
        .join(" - ");
      console.log({ sequence });
    });

    return _lines;
  }, [initTree]);

  // const initPath = useMemo(() => {
  //   return getRandomItemFromArray(initLines);
  // }, [initLines]);

  const [tree] = useState<Tree>(initTree);
  const [filteredLines, setFilteredLines] = useState<Line[]>(initLines);
  // const [path, setPath] = useState<TreeNode[]>(initPath);
  const [node, setNode] = useState<TreeNode>(tree.root);
  const [game, setGame] = useState<Chess>(initGame);
  const [trainingState, setTrainingState] = useState<TrainingState>(
    TrainingState.wait_user_move
  );
  const [trainerAnswer, setTrainerAnswer] = useState<boolean | undefined>();
  const [currentTimeout, setCurrentTimeout] = useState<number | undefined>();
  const [stats, setStats] = useState<TypeStats>(initStats);
  const [wrongNodes, setWrongNodes] = useState<TreeNode[]>([]);
  const [modalResultIsOpen, setModalResultIsOpen] = useState<boolean>(false);

  function safeGameMutate(modify: (game: Chess) => void) {
    setGame((game: Chess) => {
      const gameCpy = cloneDeep(game);
      modify(gameCpy);
      return gameCpy;
    });
  }

  function makeRandomMove(nodes: TreeNode[]) {
    const randomNode = getRandomItemFromArray(nodes) as TreeNode;

    if (!randomNode.move) {
      throw new Error("No move available for the random node.");
    }

    safeGameMutate((game: Chess) => {
      game.move(randomNode.move.san);
    });
    // Le trainingResult de l'adversaire est TOUJOURS à true (j'ai bon ?).
    randomNode.trainingResult = true;
    setNode(randomNode);
    setTrainingState(TrainingState.wait_user_move);
  }

  function openModalResult() {
    setModalResultIsOpen(true);
  }
  function closeModalResult() {
    setModalResultIsOpen(false);
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
        if (!childNode) {
          throw new Error("Child node not found.");
        }
        childNode.trainingResult = true;

        const newTimeout = window.setTimeout(() => {
          if (childNode?.hasChildren()) {
            const notTrainedChildren = childNode.children.filter(
              (node) => !node.isTrained()
            );
            makeRandomMove(notTrainedChildren);
          }
        }, OPPONENT_SPEED);

        setNode(childNode as TreeNode);
        setCurrentTimeout(newTimeout);
      } else {
        statsCpy.nbKo++;
        gameCpy.undo();
        setWrongNodes((wrongNodes: TreeNode[]) => {
          wrongNodes.push(node);
          return wrongNodes;
        });
        setNode((node) => {
          node.trainingResult = false;
          return node;
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

  const reset = () => {
    safeGameMutate((game: Chess) => {
      game.reset();
    });
    setNode(tree.root);
    setTrainingState(TrainingState.wait_user_move);
    setStats(initStats);
  };

  const ctx: TrainingContextInterface = {
    game,
    userColor,
    opponentColor,
    node,
    tree,
    directory,
    onDrop,
    isStart: !node.parentNode,
    isEndOfBranch: !node.hasChildren(),
    isWaitingForUserMove: trainingState === TrainingState.wait_user_move,
    isTrainerAnswers: trainingState === TrainingState.trainer_answers,
    trainingState,
    trainerAnswer,
    stats,
    wrongNodes,
    reset,
    modalResultIsOpen,
    openModalResult,
    closeModalResult,
  };

  return <Context value={ctx}>{children}</Context>;
};

export function useTraining() {
  return useContext(Context) as TrainingContextInterface;
}

export default TrainingProvider;
