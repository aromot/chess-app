"use client";

import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import defaultBoardStyle from "../common/defaultBoardStyle";

const HomeChessboard = () => {
  const game = new Chess();

  return (
    <Chessboard
      id="chessboard"
      position={game.fen()}
      // onPieceDrop={onDrop}
      boardOrientation={"white"}
      customBoardStyle={defaultBoardStyle}
      areArrowsAllowed={true}
      // customArrows={[["e2", "e4", "#444444"]]}
    />
  );
};

export default HomeChessboard;
