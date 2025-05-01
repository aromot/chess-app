"use client";

import { Directory } from "@prisma/client";
import TrainingProvider from "./TrainingProvider";
import TrainingChessboard from "./TrainingChessboard";
import PanelInfos from "./PanelInfos";
import { useSearchParams } from "next/navigation";
import "./train.css";
import BtnEditRepertoire from "./buttons/BtnEditRepertoire";
import BtnBack from "../common/BtnBack";

const TrainDirectory = ({ directory }: { directory: Directory }) => {
  const params = useSearchParams();
  const positionId = parseInt(params.get("positionId") as string);

  return (
    <TrainingProvider context={{ directory, positionId }}>
      <div className="h-screen">
        <div className="flex gap-3 items-center px-1 pt-1">
          <div className="text-2xl md:text-3xl flex gap-1 items-center">
            <BtnBack />
            <div className="truncate">{directory.name}</div>
          </div>
          <div>
            <BtnEditRepertoire size="sm" />
          </div>
        </div>
        <div className="sm:flex">
          <TrainingChessboard />
          <div className="flex-1 max-w-[34rem]">
            <PanelInfos />
          </div>
        </div>
      </div>
    </TrainingProvider>
  );
};

export default TrainDirectory;
