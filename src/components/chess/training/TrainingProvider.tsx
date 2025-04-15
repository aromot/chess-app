import Line from "@/lib/chess/Line";
import Tree from "@/lib/chess/Tree";
import TreeNode from "@/lib/chess/TreeNode";
import {
  BreakpointType,
  dbg,
  getCurrentBreakpoint,
  getRandomItemFromArray,
} from "@/lib/helpers";
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
import { Piece, Square } from "react-chessboard/dist/chessboard/types";
import { SquareSet } from "../common/types";
import { move2piece } from "../common/helpers";

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

  // Modal Results
  modalResultIsOpen: boolean;
  openModalResult: () => void;
  closeModals: () => void;

  // Modal Fix results
  modalFixResultIsOpen: boolean;

  filteredLines: Line[];
  depth: number;
  initLines: Line[];
  fixMistakes: () => void;
  fixMode: boolean;

  backToTraining: () => void;
  fixNextMistake: () => void;

  nbRemainingVariations: number;
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

    // dbg.info("initLines :");
    // traceLines(lines);

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
  const [modalFixResultIsOpen, setModalFixResultIsOpen] =
    useState<boolean>(false);
  const [fixMode, setFixMode] = useState<boolean>(false);
  const [breakpoint, setBreakpoint] = useState<BreakpointType | undefined>();
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [moveTo, setMoveTo] = useState<Square | null>(null);
  const [moveSquares, setMoveSquares] = useState<SquareSet>({});
  const [optionSquares, setOptionSquares] = useState<SquareSet>({});
  const [rightClickedSquares, setRightClickedSquares] = useState<SquareSet>({});
  const [showPromotionDialog, setShowPromotionDialog] =
    useState<boolean>(false);

  function safeGameMutate(modify: (game: Chess) => void) {
    setGame((game: Chess) => {
      const gameCpy = cloneDeep(game);
      modify(gameCpy);
      return gameCpy;
    });
  }

  function openModalResult() {
    setModalResultIsOpen(true);
  }
  function closeModals() {
    setModalResultIsOpen(false);
    setModalFixResultIsOpen(false);
  }

  function openModalFixResult() {
    setModalFixResultIsOpen(true);
  }

  const makeOpponentMove = useCallback(
    (availLines: Line[], depth: number, gameCpy: Chess) => {
      // console.log(
      //   "%c----------------makeOpponentMove (" + depth + ")----------------",
      //   "background: #0ff; color: #000; font-size: 15px"
      // );

      // dbg.info(
      //   "availLines (after timeout), voici les lignes dispos dans notre embranchement :"
      // );
      // traceLines(availLines);

      // const gameCpy = cloneDeep(game);

      const trainedAvailLines = availLines.filter((line) => !line.trained);

      const randomLine = getRandomItemFromArray<Line>(
        trainedAvailLines.length === 0 ? availLines : trainedAvailLines
      );
      // dbg.info("randomLine selected :");
      // traceLines([randomLine]);

      if (!randomLine) {
        alert("No more variation to train.");
        clearTimeout(currentTimeout);
        return;
      }

      const newNode = randomLine.nodes[depth];

      if (!newNode) {
        throw new Error("new node not found (computer turn).");
      }

      // console.log("gameCpy history():", gameCpy.history());

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
      // dbg.info("[output after filter line length] newFilteredLines :");
      // traceLines(newFilteredLines);

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

  function backToTraining() {
    setFixMode(false);
    closeModals();
    reset();
  }

  function onDropInFixMode(
    sourceSquare: Square,
    targetSquare: Square,
    piece: Piece
  ) {
    const gameCpy = cloneDeep(game);

    const move = gameCpy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? "q",
    });

    const childNode = node.getChildBySan(move.san);
    const isMoveInDirectory = !!childNode;

    if (isMoveInDirectory) {
      // console.log("🎉 FIX OK");
      if (!childNode.parentNode) {
        throw new Error("The fixed node does not have a parent.");
      }
      childNode.parentNode.removeWrongMove(move.san);
      setNode(childNode);
      openModalFixResult();
    } else {
      // console.log("%cWRONG FIX, START AGAIN", "color: #f00");
      gameCpy.undo();
    }

    setGame(gameCpy);
    setTrainerAnswer(isMoveInDirectory);
    setTrainingState(TrainingState.trainer_answers);
  }

  function onDrop(sourceSquare: Square, targetSquare: Square, piece: Piece) {
    // console.log(
    //   "%c----------------ON DROP (depth=" +
    //     depth +
    //     ", fixMode=" +
    //     (fixMode ? "ON" : "OFF") +
    //     ")----------------",
    //   "background: #f00; color: #fff; font-size: 15px"
    // );

    if (fixMode) {
      onDropInFixMode(sourceSquare, targetSquare, piece);
      return true;
    }

    try {
      const statsCpy = cloneDeep(stats);
      const gameCpy = cloneDeep(game);

      const move = gameCpy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? "q",
      });

      // dbg.debug(
      //   "parmi toutes les lignes ci-dessous, on ne va prendre que celles qui ont le move " +
      //     move.san +
      //     " à l'index " +
      //     depth
      // );
      // traceLines(filteredLines);

      let candidateLines = filteredLines.filter((line: Line) => {
        return line.matchesGame(gameCpy, depth);
      });

      // dbg.info("[output after filter move san] candidateLines :");
      // traceLines(candidateLines);

      const isMoveInDirectory = candidateLines.length > 0;

      if (isMoveInDirectory) {
        statsCpy.nbOk++;
        const newNode = candidateLines[0].nodes[depth];

        if (!newNode) {
          throw new Error("new node not found (user turn).");
        }
        newNode.trainingResult = true;
        // console.log("Node.trainingResult = true for " + newNode.move?.san);

        if (!newNode.hasChildren()) {
          candidateLines[0].trained = true;
          setFilteredLines(candidateLines);
          setNode(newNode);
          setStats(statsCpy);
          setGame(gameCpy);
          setTrainerAnswer(isMoveInDirectory);
          setTrainingState(TrainingState.trainer_answers);

          openModalResult();
          return true;
        }

        candidateLines = candidateLines.filter(
          (line) => line.nodes.length > depth + 1
        );
        // dbg.info("[output after filter line length] newFilteredLines :");
        // traceLines(candidateLines);

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
        // setWrongNodes((wrongNodes: TreeNode[]) => {
        //   wrongNodes.push(node);
        //   return wrongNodes;
        // });

        // setNode((node) => {
        //   node.trainingResult = false;
        //   node.addWrongMove(move.san);
        //   console.log(
        //     "Node.trainingResult = FALSE for " +
        //       node.move?.san +
        //       " (tried " +
        //       move.san +
        //       ")"
        //   );
        //   return node;
        // });

        node.trainingResult = false;
        node.addWrongMove(move.san);
        // console.log(
        //   "Node.trainingResult = FALSE for " +
        //     node.move?.san +
        //     " (tried " +
        //     move.san +
        //     ")"
        // );
        setNode(node);
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
    setFixMode(false);
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
    setMoveSquares({});
    setOptionSquares({});
    setRightClickedSquares({});
  };

  const fixMistakes = () => {
    const gameCpy = cloneDeep(game);
    let nodeToFix: TreeNode | undefined;

    tree.traverseBF((node) => {
      if (!nodeToFix && node.hasWrongMoves()) {
        nodeToFix = node;
      }
    });

    if (!nodeToFix) {
      throw new Error("No node to fix.");
    }

    gameCpy.load(nodeToFix.position.fen);
    closeModals();

    setDepth(nodeToFix.depth);
    setFilteredLines(initLines);
    setGame(gameCpy);
    setFixMode(true);
    setNode(nodeToFix);
    setTrainingState(TrainingState.wait_user_move);
  };

  function fixNextMistake() {
    const gameCpy = cloneDeep(game);
    let nodeToFix: TreeNode | undefined;

    tree.traverseBF((node) => {
      if (!nodeToFix && node.hasWrongMoves()) {
        nodeToFix = node;
      }
    });

    if (!nodeToFix) {
      throw new Error("No node to fix.");
    }

    gameCpy.load(nodeToFix.position.fen);
    closeModals();

    setDepth(nodeToFix.depth);
    setFilteredLines(initLines);
    setGame(gameCpy);
    setFixMode(true);
    setNode(nodeToFix);
    setTrainingState(TrainingState.wait_user_move);
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
    onDrop(foundMove.from, foundMove.to, piece);
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

      onDrop(moveFrom, moveTo, piece);
    }
    setMoveFrom(null);
    setMoveTo(null);
    setShowPromotionDialog(false);
    setOptionSquares({});
    return true;
  }

  useEffect(() => {
    setBreakpoint(getCurrentBreakpoint());
  }, []);

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
    closeModals,
    filteredLines,
    depth,
    initLines,
    fixMistakes,
    fixMode,
    modalFixResultIsOpen,
    backToTraining,
    fixNextMistake,
    nbRemainingVariations: initLines.filter((line) => !line.trained).length,
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

export function useTraining() {
  return useContext(Context) as TrainingContextInterface;
}

export default TrainingProvider;
