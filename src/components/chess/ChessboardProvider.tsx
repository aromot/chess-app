import { Directory, Move, Position } from "@prisma/client";
import { Chess } from "chess.js";
import { createContext, useContext, useMemo, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import { addMove } from "@/positions/actions";
import { Piece, Square } from "react-chessboard/dist/chessboard/types";

interface ChessboardContextInterface {
  directory: Directory;
  game: Chess;
  initPos: Position;
  position: Position;
  move: Move | null;
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
    console.log("Ici dans le useMemo de initPos, directory:", directory);
    return directory.Position[0]; // TODO pas top, à améliorer
  }, [directory]);
  const initMove = initPos.moves[0] as Move;

  const [game, setGame] = useState<Chess>(new Chess(initPos.fen));
  const [position, setPosition] = useState<Position>(initPos);
  const [move, setMove] = useState<Move | null>(null);

  async function onDrop(sourceSquare, targetSquare, piece) {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? "q",
      });

      console.log({ move });

      // MAJ le moteur de jeu
      setGame((game) => cloneDeep(game));

      // cherche si la nouvelle position existe déjà...
      // Pour ça, on cherche si la position courante existe ET SI elle contient le move courant.
      const existingPos: Position | null = directory.Position.find(
        (pos: Position) => pos.fen == move.before
      );
      const existingMove: Move | null = existingPos?.moves.find(
        (_move: Move) => _move.san == move.san
      );

      console.log({ existingPos, existingMove });

      if (existingMove) {
        console.log("LE MOVE EXISTE DEJA");
        const nextPosition = directory.Position.find(
          (pos: Position) => pos.id == existingMove.nextPositionId
        );
        setPosition(nextPosition as Position);
        setMove(existingMove as Move);
      } else {
        console.log("NOUVEAU MOVE, position:", position);
        const [newPosition, newMove] = await addMove(
          directory.id,
          move.san,
          move.after,
          position.id
        );
        console.log({ newPosition, newMove });
        setPosition(newPosition as Position);
        setMove(newMove as Move);
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
    return directory.Position.find(
      (pos: Position) => pos.id == move.nextPositionId
    );
  };

  const getPreviousPosition = (move: Move) => {
    return directory.Position.find(
      (pos: Position) => pos.id == move.positionId
    );
  };

  const getNextMove = (move: Move) => {
    const nextPos = getNextPosition(move);
    return nextPos?.moves[0];
  };

  const onClickReset = () => {
    game.reset();
    setGame((game) => cloneDeep(game));
    setPosition(initPos);
    setMove(null);
  };

  const onClickBackward = () => {
    if (!move) {
      alert("Vous êtes déjà au début du répertoire.");
      return;
    }

    game.undo();

    setGame((game) => cloneDeep(game));

    const pos = getPreviousPosition(move);
    setPosition(pos);
    const prevPos = directory.Position.find(
      (_pos: Position) => _pos.moves[0]?.nextPositionId == pos.id
    );
    setMove(prevPos ? prevPos.moves[0] : null);
  };

  const onClickForward = () => {
    // Si on est en position initiale, alors il n'y a pas encore de move, donc on prend le 1er
    // Sinon, on récupère le prochain move de la branche.
    const nextMove: Move | null = move ? getNextMove(move) : initPos.moves[0];
    console.log({ move, nextMove });
    if (!nextMove) {
      alert("Il n'y a pas de prochain coup (fin de la branche).");
      console.log("Il n'y a pas de prochain coup (fin de la branche).");

      return;
    }
    game.move(nextMove.san);
    setGame((game) => cloneDeep(game));

    const nextPosition = getNextPosition(nextMove);
    setPosition(nextPosition);
    setMove(nextMove);
  };

  const ctx: ChessboardContextInterface = {
    game,
    initPos,
    position,
    move,
    directory,
    onDrop,
    getNextMove,
    onClickReset,
    onClickBackward,
    onClickForward,
    isStart: !move,
    isEndOfBranch: !(move ? getNextMove(move) : initPos.moves[0]),
  };

  return <Context value={ctx}>{children}</Context>;
};

export function useChessboard() {
  return useContext(Context) as ChessboardContextInterface;
}

export default ChessboardProvider;
