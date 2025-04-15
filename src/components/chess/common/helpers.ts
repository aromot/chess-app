import { Move as ChessMove } from "chess.js";
import { Piece } from "react-chessboard/dist/chessboard/types";

export function move2piece(move: ChessMove): Piece {
  // @ts-expect-error ça marche
  return move.color + move.piece.toUpperCase();
}
