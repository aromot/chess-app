import Line from "@/lib/chess/Line";
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
  reset: (flushTrainedLines?: boolean) => void;
  modalResultIsOpen: boolean;
  openModalResult: () => void;
  closeModalResult: () => void;
  filteredLines: Line[];
  depth: number;
  initLines: Line[];
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

function traceLines(lines: Line[]) {
  lines.forEach((line) => {
    const sequence = line.nodes
      .map((node) => {
        return node.move?.san;
      })
      .join(" - ");
    console.log(sequence);
  });
}

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
    const g = new Chess(initTree.posInit.fen);
    return g;
  }, [initTree]);

  // initLines contient TOUTES les lignes possibles (= toutes les variantes de l'arbre).
  const initLines = useMemo(() => {
    const lines: Line[] = [];
    initTree.traverseBF((node) => {
      if (!node.hasChildren()) {
        const nodes = node.getParentNodes();
        nodes.shift(); // remove root node.
        const line = new Line(nodes.concat(node));
        lines.push(line);
      }
    });

    dbg.info("initLines :");
    traceLines(lines);

    return lines;
  }, [initTree]);

  const [tree] = useState<Tree>(initTree);
  const [depth, setDepth] = useState(0);
  const [filteredLines, setFilteredLines] = useState<Line[]>(initLines);
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

  const filterLines = useCallback(
    function (san: string) {
      dbg.debug(
        "Start filterLines: parmi toutes les lignes ci-dessous, on ne va prendre que celles qui commencent par " +
          san
      );
      traceLines(filteredLines);
      return filteredLines.filter((line) => {
        return line.nodes[0].move?.san === san;
      });
    },
    [filteredLines]
  );

  const makeOpponentMove = useCallback(
    (availLines: Line[], depth: number, gameCpy: Chess) => {
      console.log(
        "%c----------------makeOpponentMove (" + depth + ")----------------",
        "background: #0ff; color: #000; font-size: 15px"
      );

      dbg.info(
        "availLines (after timeout), voici les lignes dispos dans notre embranchement :"
      );
      traceLines(availLines);

      // const gameCpy = cloneDeep(game);

      const trainedAvailLines = availLines.filter((line) => !line.trained);

      const randomLine = getRandomItemFromArray<Line>(
        trainedAvailLines.length === 0 ? availLines : trainedAvailLines
      );
      dbg.info("randomLine selected :");
      traceLines([randomLine]);

      if (!randomLine) {
        alert("No more variation to train.");
        clearTimeout(currentTimeout);
        return;
      }

      const newNode = randomLine.nodes[depth];

      if (!newNode) {
        throw new Error("new node not found (computer turn).");
      }

      console.log("gameCpy history():", gameCpy.history());

      gameCpy.move(newNode.move.san);

      let newFilteredLines = availLines.filter((line) => {
        return line.matchesGame(gameCpy, depth);
      });

      if (!newNode.hasChildren()) {
        randomLine.trained = true;

        setFilteredLines(newFilteredLines);
        setNode(newNode);
        setGame(gameCpy);
        setTrainingState(TrainingState.wait_user_move);
        clearTimeout(currentTimeout);

        openModalResult();
        return;
      }

      newFilteredLines = newFilteredLines.filter(
        (line) => line.nodes.length > depth + 1
      );
      dbg.info("[output after filter line length] newFilteredLines :");
      traceLines(newFilteredLines);

      setDepth(depth + 1);
      setFilteredLines(newFilteredLines);
      // safeGameMutate((game: Chess) => {
      //   // console.log("node0.move.san:", currNode.move.san);
      //   game.move(newNode.move.san);
      // });
      setGame(gameCpy);
      setNode(newNode);
      setTrainingState(TrainingState.wait_user_move);
      clearTimeout(currentTimeout);
    },
    [currentTimeout]
  );

  function onDrop(sourceSquare: Square, targetSquare: Square, piece: Piece) {
    console.log(
      "%c----------------ON DROP (" + depth + ")----------------",
      "background: #f00; color: #fff; font-size: 15px"
    );
    try {
      const statsCpy = cloneDeep(stats);
      const gameCpy = cloneDeep(game);

      const move = gameCpy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? "q",
      });

      dbg.debug(
        "parmi toutes les lignes ci-dessous, on ne va prendre que celles qui ont le move " +
          move.san +
          " à l'index " +
          depth
      );
      traceLines(filteredLines);

      let candidateLines = filteredLines.filter((line: Line) => {
        return line.matchesGame(gameCpy, depth);
      });

      dbg.info("[output after filter move san] candidateLines :");
      traceLines(candidateLines);

      const isMoveInDirectory = candidateLines.length > 0;

      if (isMoveInDirectory) {
        statsCpy.nbOk++;
        const newNode = candidateLines[0].nodes[depth];

        if (!newNode) {
          throw new Error("new node not found (user turn).");
        }
        newNode.trainingResult = true;

        if (!newNode.hasChildren()) {
          candidateLines[0].trained = true;
          setFilteredLines(candidateLines);
          setNode(newNode);
          setStats(statsCpy);
          setGame(gameCpy);
          setTrainerAnswer(isMoveInDirectory);
          setTrainingState(TrainingState.trainer_answers);

          openModalResult();
          return;
        }

        candidateLines = candidateLines.filter(
          (line) => line.nodes.length > depth + 1
        );
        dbg.info("[output after filter line length] newFilteredLines :");
        traceLines(candidateLines);

        setDepth(depth + 1);
        setFilteredLines(candidateLines);
        setNode(newNode as TreeNode);
        const newTimeout = window.setTimeout(() => {
          if (candidateLines.length > 0) {
            makeOpponentMove(candidateLines, depth + 1, gameCpy);
          }
        }, OPPONENT_SPEED);
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

  const reset = (flushTrainedLines: boolean = false) => {
    setDepth(0);
    if (flushTrainedLines) {
      initLines.forEach((line) => (line.trained = false));
    }
    setFilteredLines(initLines);
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
    filteredLines,
    depth,
    initLines,
  };

  return <Context value={ctx}>{children}</Context>;
};

export function useTraining() {
  return useContext(Context) as TrainingContextInterface;
}

export default TrainingProvider;
