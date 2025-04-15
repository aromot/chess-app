import { Chessboard } from "react-chessboard";
import { useTraining } from "./TrainingProvider";
import defaultBoardStyle from "../common/defaultBoardStyle";
import { CustomSquareProps } from "react-chessboard/dist/chessboard/types";

const CustomSquareRenderer = ({
  children,
  square,
  style,
  ref,
}: CustomSquareProps) => {
  const { isTrainerAnswers, node, trainerAnswer, isWaitingForUserMove } =
    useTraining();

  const customStyles = { ...style };

  // Allume la casse d'arrivée du dernier move correct de l'utilisateur.
  if (isTrainerAnswers && trainerAnswer && square === node.move?.squareTo) {
    customStyles.background = "#15803d";
    customStyles.boxShadow = "0px 0px 5px 5px #ffffffaa";
    customStyles.zIndex = 2;
    customStyles.position = "relative";
  }

  // Allume les cases de départ de la position de départ et d'arrivée du move adverse.
  if (
    isWaitingForUserMove &&
    node.move !== null &&
    (square == node.move.squareFrom || square == node.move.squareTo)
  ) {
    customStyles.background = "#eba133";
  }

  return (
    <div ref={ref} style={customStyles}>
      {children}
    </div>
  );
};

const TrainingChessboard = () => {
  const {
    game,
    onDrop,
    directory,
    onSquareClick,
    moveSquares,
    optionSquares,
    rightClickedSquares,
    moveTo,
    onSquareRightClick,
    onPromotionPieceSelect,
    showPromotionDialog,
  } = useTraining();

  return (
    <div className="flex flex-col">
      <div className="sm:w-[20rem] md:w-[24rem] lg:w-[32rem] xl:w-[40rem] 2xl:w-[42rem] aspect-square p-3 relative">
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
          customSquare={CustomSquareRenderer}
          // customArrows={[["e2", "e4", "#444444"]]}
        />
      </div>
      {/* {isDev() && <div className="px-3">breakpoint: {breakpoint}</div>} */}
    </div>
  );
};

export default TrainingChessboard;
