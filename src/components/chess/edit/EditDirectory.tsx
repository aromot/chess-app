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
        <div className="flex h-screen bg-zinc-900">
          <EditableChessboard />
          <div className="flex-1 max-w-[48rem]">
            <PanelInfos />
          </div>
        </div>
      </EditChessboardProvider>
    </QueryClientProvider>
  );
};

export default EditDirectory;
