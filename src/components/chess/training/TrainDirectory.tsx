"use client";

import { Directory } from "@prisma/client";
import TrainingProvider from "./TrainingProvider";
import TrainingChessboard from "./TrainingChessboard";
import PanelInfos from "./PanelInfos";
import { useSearchParams } from "next/navigation";

const TrainDirectory = ({ directory }: { directory: Directory }) => {
  const params = useSearchParams();
  const positionId = parseInt(params.get("positionId") as string);
  console.log({ positionId });

  return (
    <TrainingProvider context={{ directory, positionId }}>
      <div className="h-screen bg-zinc-900">
        <div className="text-3xl px-5 pt-3">{directory.name}</div>
        <div className="flex">
          <TrainingChessboard />
          <div className="flex-1 max-w-[48rem]">
            <PanelInfos />
          </div>
        </div>
      </div>
    </TrainingProvider>
  );
};

export default TrainDirectory;
