import { Chessboard } from "react-chessboard";
import { useChessboard } from "./EditChessboardProvider";
import { Button } from "../../ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { URLS } from "@/app/urls";
import defaultBoardStyle from "../common/defaultBoardStyle";
import { formatUrl } from "@/lib/helpers";

const EditableChessboard = () => {
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
  const router = useRouter();

  return (
    <>
      <Chessboard
        id="chessboard"
        position={game.fen()}
        onPieceDrop={onDrop}
        boardOrientation={directory.white ? "white" : "black"}
        customBoardStyle={defaultBoardStyle}
        areArrowsAllowed={true}
        // customArrows={[["e2", "e4", "#444444"]]}
      />
      <div className="flex mt-5">
        <div className="flex-1">
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={onClickReset}
              disabled={isStart}
            >
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
        </div>
        <div>
          <Button
            onClick={() => {
              router.push(formatUrl(URLS.training, { id: directory.id }));
            }}
          >
            S'entrainer
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditableChessboard;
