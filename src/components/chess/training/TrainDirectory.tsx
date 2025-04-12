"use client";

import { Directory } from "@prisma/client";
import TrainingProvider from "./TrainingProvider";
import TrainingChessboard from "./TrainingChessboard";
import PanelInfos from "./PanelInfos";
import { useSearchParams } from "next/navigation";
import "./train.css";
import BtnEditRepertoire from "./buttons/BtnEditRepertoire";
import { SidebarTrigger } from "@/components/ui/sidebar";

const TrainDirectory = ({ directory }: { directory: Directory }) => {
  const params = useSearchParams();
  const positionId = parseInt(params.get("positionId") as string);

  return (
    <TrainingProvider context={{ directory, positionId }}>
      <div className="h-screen bg-zinc-900">
        <div className="flex px-5 pt-3 gap-3 items-center">
          <div className="text-3xl">
            <SidebarTrigger /> {directory.name}
          </div>
          <div>
            <BtnEditRepertoire size="sm" />
          </div>
        </div>
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
