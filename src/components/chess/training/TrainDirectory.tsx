"use client";

import { Directory } from "@prisma/client";
import TrainingProvider from "./TrainingProvider";
import TrainingChessboard from "./TrainingChessboard";
import PanelInfos from "./PanelInfos";

const TrainDirectory = ({ directory }: { directory: Directory }) => {
  return (
    <TrainingProvider context={{ directory }}>
      <div className="flex h-screen bg-zinc-900">
        <TrainingChessboard />
        <div className="flex-1 max-w-[48rem]">
          <PanelInfos />
        </div>
      </div>
    </TrainingProvider>
  );
};

export default TrainDirectory;
