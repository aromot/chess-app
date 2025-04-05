"use client";

import { Chessboard as ReactChessboard } from "react-chessboard";
import defaultBoardStyle from "../common/defaultBoardStyle";
import { Directory } from "@prisma/client";
import { CustomSquareProps } from "react-chessboard/dist/chessboard/types";
import ChessboardDemoProvider, {
  useChessboardDemo,
} from "./ChessboardDemoProvider";
import MessageInfo from "./MessageInfo";

const CustomSquareRenderer = ({
  children,
  square,
  style,
  ref,
}: CustomSquareProps) => {
  const { node, opponentCheckDone, userCheckSuccess, userCheckError, game } =
    useChessboardDemo();

  const customStyles = { ...style };

  // Allume la casse d'arrivée du dernier move correct de l'utilisateur.
  if (userCheckSuccess && square === node.move?.squareTo) {
    customStyles.background = "#15803d";
    customStyles.borderRadius = "10px";
    customStyles.boxShadow = "0px 0px 5px 5px #ffffffaa";
    customStyles.zIndex = 2;
    customStyles.position = "relative";
  }

  if (userCheckError) {
    const history = [...game.history({ verbose: true })];
    const lastMove = history.pop();

    if (square === lastMove?.to) {
      customStyles.background = "#ad0000";
      customStyles.borderRadius = "10px";
      customStyles.boxShadow = "0px 0px 5px 5px #ffffffaa";
      customStyles.zIndex = 2;
      customStyles.position = "relative";
    }
  }

  // Allume les cases de départ de la position de départ et d'arrivée du move adverse.
  if (
    opponentCheckDone &&
    node.move !== null &&
    (square == node.move.squareFrom || square == node.move.squareTo)
  ) {
    customStyles.background = "#eba133";
    customStyles.borderRadius = "10px";
  }

  return (
    <div ref={ref} style={customStyles}>
      {children}
    </div>
  );
};

const ChessboardDemo = ({ directory }: { directory: Directory }) => {
  return (
    <ChessboardDemoProvider directory={directory}>
      <Chessboard />
    </ChessboardDemoProvider>
  );
};

const Chessboard = () => {
  const { game, directory } = useChessboardDemo();

  return (
    <div
      className="flex flex-col max-w-[25rem] sm:max-w-[30rem] mx-auto md:max-w-[24rem] lg:max-w-[32rem] xl:max-w-[30rem] 2xl:max-w-[36rem]"
      style={{ pointerEvents: "none" }}
    >
      {/* <div className="sm:w-[20rem] md:w-[24rem] lg:w-[32rem] xl:w-[40rem] 2xl:w-[42rem] aspect-square p-2"> */}
      <div className="w-[23rem] sm:w-[30rem] md:w-[24rem] lg:w-[28rem] xl:w-[30rem] 2xl:w-[36rem] aspect-square p-2">
        <ReactChessboard
          id="chessboard"
          position={game.fen()}
          // onPieceDrop={onDrop}
          boardOrientation={directory.white ? "white" : "black"}
          customBoardStyle={defaultBoardStyle}
          areArrowsAllowed={false}
          customSquare={CustomSquareRenderer}
        />
      </div>
      <div className="p-2 pt-0">
        <MessageInfo />
      </div>

      <div className="p-2 min-h-16 text-sm">{game.pgn()}</div>
    </div>
  );
};

export default ChessboardDemo;
