import { Chessboard } from "react-chessboard";
import { useChessboard } from "./ChessboardProvider";

const ChessboardWrapper = () => {
  const { game, onDrop, directory } = useChessboard();

  return (
    <Chessboard
      id="chessboard"
      position={game.fen()}
      onPieceDrop={onDrop}
      boardOrientation={directory.white ? "white" : "black"}
      customBoardStyle={{
        borderRadius: "10px",
      }}
    />
  );
};

export default ChessboardWrapper;
