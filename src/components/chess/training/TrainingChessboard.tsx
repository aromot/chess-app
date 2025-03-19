import { Chessboard } from "react-chessboard";
import { useTraining } from "./TrainingProvider";
import defaultBoardStyle from "../common/defaultBoardStyle";

const TrainingChessboard = () => {
  const { game, onDrop, directory } = useTraining();

  return (
    <div>
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
  );
};

export default TrainingChessboard;
