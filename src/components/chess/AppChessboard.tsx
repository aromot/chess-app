"use client";

import { Directory } from "@prisma/client";
import ChessboardProvider from "./ChessboardProvider";
import ChessboardWrapper from "./ChessboardWrapper";
import PanelInfos from "./PanelInfos";

const AppChessboard = ({ directory }: { directory: Directory }) => {
  return (
    <ChessboardProvider context={{ directory }}>
      <div className="h-screen bg-zinc-900">
        <div className="flex">
          <div className="w-[600px] p-5">
            <ChessboardWrapper />
          </div>
          <div className="flex-1">
            <PanelInfos />
          </div>
        </div>
      </div>
    </ChessboardProvider>
  );
};

export default AppChessboard;
