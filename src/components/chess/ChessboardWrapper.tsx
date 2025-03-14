import { Chessboard } from "react-chessboard";
import { useChessboard } from "./ChessboardProvider";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft } from "lucide-react";

const ChessboardWrapper = () => {
  const {
    game,
    onDrop,
    directory,
    onClickReset,
    isStart,
    onClickBackward,
    onClickForward,
    isEndOfBranch,
  } = useChessboard();

  return (
    <>
      <Chessboard
        id="chessboard"
        position={game.fen()}
        onPieceDrop={onDrop}
        boardOrientation={directory.white ? "white" : "black"}
        customBoardStyle={{
          borderRadius: "10px",
        }}
      />
      <div className="flex gap-3 mt-5">
        <Button variant="secondary" onClick={onClickReset} disabled={isStart}>
          <ChevronsLeft />
        </Button>
        <Button
          variant="secondary"
          onClick={onClickBackward}
          disabled={isStart}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="secondary"
          onClick={onClickForward}
          disabled={isEndOfBranch}
        >
          <ChevronRight />
        </Button>
      </div>
    </>
  );
};

export default ChessboardWrapper;
