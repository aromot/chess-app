import { Chessboard } from "react-chessboard";
import { useChessboard } from "./EditChessboardProvider";
import { Button } from "../../ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { URLS } from "@/app/urls";
import defaultBoardStyle from "../common/defaultBoardStyle";
import { formatUrl, isDev } from "@/lib/helpers";
import { cn } from "@/lib/utils";

const GameTurn = () => {
  const { game, isUserTurn } = useChessboard();
  const whiteToPlay = game.turn() === "w";

  return (
    <div
      className={cn("absolute right-0 z-20", isUserTurn ? "bottom-5" : "top-3")}
    >
      <div
        className={cn(
          "rounded-full w-2 h-2 sm:w-4 sm:h-4",
          whiteToPlay ? "bg-white" : "bg-black border-white border-2"
        )}
      >
        &nbsp;
      </div>
    </div>
  );
};

const EditableChessboard = () => {
  const {
    game,
    node,
    onDrop,
    directory,
    onClickReset,
    isStart,
    onClickBackward,
    onClickForward,
    isEndOfBranch,
    isUserTurn,
    breakpoint,
    onSquareClick,
    moveSquares,
    optionSquares,
    rightClickedSquares,
    moveTo,
    onSquareRightClick,
    onPromotionPieceSelect,
    showPromotionDialog,
  } = useChessboard();
  const router = useRouter();

  const btnSize = breakpoint === "xs" ? "sm" : "default";

  return (
    <div className="flex flex-col">
      <div className="sm:w-[20rem] md:w-[24rem] lg:w-[32rem] xl:w-[40rem] 2xl:w-[42rem] aspect-square p-3 sm:pr-5 relative">
        <div className="z-40 relative">
          <Chessboard
            id="chessboard"
            animationDuration={250}
            position={game.fen()}
            onSquareClick={onSquareClick}
            onSquareRightClick={onSquareRightClick}
            onPieceDrop={onDrop}
            onPromotionPieceSelect={onPromotionPieceSelect}
            boardOrientation={directory.white ? "white" : "black"}
            customBoardStyle={defaultBoardStyle}
            customSquareStyles={{
              ...moveSquares,
              ...optionSquares,
              ...rightClickedSquares,
            }}
            areArrowsAllowed={true}
            promotionToSquare={moveTo}
            showPromotionDialog={showPromotionDialog}
            // customArrows={[["e2", "e4", "#444444"]]}
          />
        </div>
        <GameTurn />
      </div>
      <div className="flex px-5">
        <div className="flex-1">
          <div className="flex gap-3">
            <Button
              size={btnSize}
              variant="secondary"
              onClick={onClickReset}
              disabled={isStart}
            >
              <ChevronsLeft />
            </Button>
            <Button
              size={btnSize}
              variant="secondary"
              onClick={onClickBackward}
              disabled={isStart}
            >
              <ChevronLeft />
            </Button>
            <Button
              size={btnSize}
              variant="secondary"
              onClick={onClickForward}
              disabled={isEndOfBranch}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
        <div className="flex gap-3">
          {isDev() && !isStart && isUserTurn && (
            <Button
              size={btnSize}
              onClick={() => {
                const url =
                  formatUrl(URLS.training, { id: directory.id }) +
                  `?positionId=${node.position.id}`;
                router.push(url);
              }}
            >
              Train from this position
            </Button>
          )}
          <Button
            size={btnSize}
            onClick={() => {
              router.push(formatUrl(URLS.training, { id: directory.id }));
            }}
          >
            Train
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditableChessboard;
