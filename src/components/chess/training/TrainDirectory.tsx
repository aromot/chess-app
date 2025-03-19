"use client";

import { Directory } from "@prisma/client";
import TrainingProvider from "./TrainingProvider";
import TrainingChessboard from "./TrainingChessboard";
import PanelInfos from "./PanelInfos";

const TrainDirectory = ({ directory }: { directory: Directory }) => {
  return (
    <TrainingProvider context={{ directory }}>
      <div className="h-screen bg-zinc-900">
        <div className="flex">
          <div className="w-[600px] p-5">
            <TrainingChessboard />
          </div>
          <div className="flex-1">
            <PanelInfos />
          </div>
        </div>
      </div>
    </TrainingProvider>
  );
};

export default TrainDirectory;
