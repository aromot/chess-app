import { Chessboard } from "react-chessboard";
import { useTraining } from "./TrainingProvider";
import defaultBoardStyle from "../common/defaultBoardStyle";

const TrainingChessboard = () => {
  const { game, onDrop, directory } = useTraining();

  return (
    <div className="flex flex-col">
      <div className="sm:w-[20rem] md:w-[24rem] lg:w-[32rem] xl:w-[40rem] 2xl:w-[42rem] aspect-square p-5">
        <Chessboard
          id="chessboard"
          position={game.fen()}
          onPieceDrop={onDrop}
          boardOrientation={directory.white ? "white" : "black"}
          customBoardStyle={defaultBoardStyle}
          areArrowsAllowed={true}
          // customArrows={[["e2", "e4", "#444444"]]}
        />
      </div>
    </div>
  );
};

export default TrainingChessboard;
