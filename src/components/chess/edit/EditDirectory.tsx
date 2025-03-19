"use client";

import { Directory } from "@prisma/client";
import EditChessboardProvider from "./EditChessboardProvider";
import EditableChessboard from "./EditableChessboard";
import PanelInfos from "./PanelInfos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const EditDirectory = ({ directory }: { directory: Directory }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <EditChessboardProvider context={{ directory }}>
        <div className="h-screen bg-zinc-900">
          <div className="flex">
            <div className="w-[600px] p-5">
              <EditableChessboard />
            </div>
            <div className="flex-1">
              <PanelInfos />
            </div>
          </div>
        </div>
      </EditChessboardProvider>
    </QueryClientProvider>
  );
};

export default EditDirectory;
