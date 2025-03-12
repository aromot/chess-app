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
import cloneDeep from "lodash/cloneDeep";
import { addMove } from "@/app/positions/_actions/actions";
import { Piece, Square } from "react-chessboard/dist/chessboard/types";

interface ChessboardContextInterface {
  directory: Directory;
  tree: { position: Position };
  game: Chess;
  node: unknown;
  // initPos: Position;
  position: Position;
  lastMove: Move | null;
  onDrop: (sourceSquare: Square, targetSquare: Square, piece: Piece) => boolean;
  getNextMove: (move: Move) => Move | null;
  onClickReset: () => void;
  onClickBackward: () => void;
  onClickForward: () => void;
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

  const initPos: Position = useMemo(() => {
    return directory.positions.find(
      (pos: Position) => pos.fen === directory.fenPosInit
    );
  }, [directory]);

  const initTree = useMemo(() => {
    // ici on construit l'arbre

    function processPosition(position) {
      position.moves.forEach((move) => {
        move.position = directory.positions.find(
          (pos) => pos.id === move.nextPositionId
        );
        processPosition(move.position);
      });
    }

    processPosition(initPos);

    console.log({ tree: { position: initPos } });

    return {
      position: initPos,
    };
  }, [directory]);

  const [game, setGame] = useState<Chess>(new Chess(directory.fenPosInit));
  const [tree, setTree] = useState(initTree);
  const [node, setNode] = useState(tree.position);
  const [position, setPosition] = useState<Position>(initPos);
  const [lastMove, setLastMove] = useState<Move | null>(null);

  const getNextMove = (move: Move) => {
    const nextPos = getNextPosition(move);
    return nextPos?.moves[0];
  };

  const onClickForward = useCallback(() => {
    // Si on est en position initiale, alors il n'y a pas encore de move, donc on prend le 1er
    // Sinon, on récupère le prochain move de la branche.
    const nextMove: Move | null = lastMove
      ? getNextMove(lastMove)
      : initPos.moves[0];
    console.log({ move: lastMove, nextMove });
    if (!nextMove) {
      alert("Il n'y a pas de prochain coup (fin de la branche).");
      console.log("Il n'y a pas de prochain coup (fin de la branche).");

      return;
    }
    game.move(nextMove.san);
    setGame((game) => cloneDeep(game));

    const nextPosition = getNextPosition(nextMove);
    setPosition(nextPosition);
    setLastMove(nextMove);
  }, [game, position, lastMove]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
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
    },
    [game, position, lastMove]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  async function onDrop(sourceSquare, targetSquare, piece) {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? "q",
      });

      console.log({ move });
      console.log({ position });

      // MAJ le moteur de jeu
      setGame((game) => cloneDeep(game));

      // A partir de la position courante, on cherche si le move enfant existe déjà
      const eeexistingMove = position.moves.find(
        (_move: Move) => _move.san === move.san
      );

      if (eeexistingMove) {
        console.log("LE MOVE EXISTE DEJA");

        setPosition(eeexistingMove.position as Position);
        setLastMove(eeexistingMove as Move);
        const nodeMove = node.moves.find(
          (_move: Move) => _move.san === move.san
        );
        setNode(nodeMove.position);
      } else {
        console.log("NOUVEAU MOVE à partir de cette position");

        const [newPosition, newMove] = await addMove(
          directory.id,
          move.san,
          move.after,
          position.id
        );
        newPosition.moves = [];
        console.log({ newPosition, newMove });
        newMove.position = newPosition;
        node.moves.push(newMove);
        const _lastMove = node.moves[node.moves.length - 1];
        setNode(_lastMove.position);
        console.log({ node });

        setPosition(newPosition as Position);
        setLastMove(newMove as Move);
      }

      return;

      // cherche si la nouvelle position existe déjà...
      // Pour ça, on cherche si la position courante existe ET SI elle contient le move courant.
      const existingPos: Position | null = directory.positions.find(
        (pos: Position) => pos.fen == move.before
      );
      const existingMove: Move | null = existingPos?.moves.find(
        (_move: Move) => _move.san == move.san
      );

      console.log({ existingPos, existingMove });

      if (existingMove) {
        console.log("LE MOVE EXISTE DEJA");
        const nextPosition = directory.positions.find(
          (pos: Position) => pos.id == existingMove.nextPositionId
        );
        setPosition(nextPosition as Position);
        setLastMove(existingMove as Move);
      } else {
        console.log("NOUVEAU MOVE, position:", position);
        // // const [newPosition, newMove] = await addMove(
        // //   directory.id,
        // //   move.san,
        // //   move.after,
        // //   position.id
        // // );
        // // console.log({ newPosition, newMove });
        // setPosition(newPosition as Position);
        // setLastMove(newMove as Move);
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

  const getNextPosition = (move: Move) => {
    return directory.positions.find(
      (pos: Position) => pos.id == move.nextPositionId
    );
  };

  const getPreviousPosition = (move: Move) => {
    return directory.positions.find(
      (pos: Position) => pos.id == move.positionId
    );
  };

  const onClickReset = () => {
    game.reset();
    setGame((game) => cloneDeep(game));
    setPosition(initPos);
    setLastMove(null);
  };

  const onClickBackward = () => {
    if (!lastMove) {
      alert("Vous êtes déjà au début du répertoire.");
      return;
    }

    game.undo();

    setGame((game) => cloneDeep(game));

    const pos = getPreviousPosition(lastMove);
    setPosition(pos);
    const prevPos = directory.positions.find(
      (_pos: Position) => _pos.moves[0]?.nextPositionId == pos.id
    );
    setLastMove(prevPos ? prevPos.moves[0] : null);
  };

  const ctx: ChessboardContextInterface = {
    game,
    node,
    tree,
    // initPos,
    position,
    lastMove,
    directory,
    onDrop,
    getNextMove,
    onClickReset,
    onClickBackward,
    onClickForward,
    isStart: !lastMove,
    // isEndOfBranch: !(lastMove ? getNextMove(lastMove) : initPos.moves[0]),
    isEndOfBranch: true,
  };

  return <Context value={ctx}>{children}</Context>;
};

export function useChessboard() {
  return useContext(Context) as ChessboardContextInterface;
}

export default ChessboardProvider;
