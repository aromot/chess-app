import { Chessboard } from "react-chessboard";
import { useTraining } from "./TrainingProvider";
import defaultBoardStyle from "../common/defaultBoardStyle";
import { CustomSquareProps } from "react-chessboard/dist/chessboard/types";

const CustomSquareRenderer = ({
  children,
  square,
  squareColor,
  style,
  ref,
}: CustomSquareProps) => {
  const { isTrainerAnswers, node, trainerAnswer } = useTraining();

  const customStyles = { ...style };

  if (isTrainerAnswers && trainerAnswer && square === node.move?.squareTo) {
    customStyles.background = "#16a34a";
    customStyles.boxShadow = "0px 0px 5px 5px #ffffffaa";
    customStyles.zIndex = 2;
    customStyles.position = "relative";
  }

  return (
    <div ref={ref} style={customStyles}>
      {children}
      {/* <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 16,
          width: 16,
          borderTopLeftRadius: 6,
          backgroundColor: squareColor === "black" ? "#064e3b" : "#312e81",
          color: "#fff",
          fontSize: 14,
        }}
      >
        {square}
      </div> */}
    </div>
  );
};

const TrainingChessboard = () => {
  const { game, onDrop, directory } = useTraining();

  return (
    <div className="flex flex-col">
      {/* 2xl:w-[42rem] */}
      <div className="sm:w-[20rem] md:w-[24rem] lg:w-[32rem] xl:w-[40rem] 2xl:w-[32rem] aspect-square p-5">
        <Chessboard
          id="chessboard"
          position={game.fen()}
          onPieceDrop={onDrop}
          boardOrientation={directory.white ? "white" : "black"}
          customBoardStyle={defaultBoardStyle}
          areArrowsAllowed={true}
          customSquare={CustomSquareRenderer}
          // customArrows={[["e2", "e4", "#444444"]]}
        />
      </div>
    </div>
  );
};

export default TrainingChessboard;
