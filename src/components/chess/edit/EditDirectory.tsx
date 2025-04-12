"use client";

import { Directory } from "@prisma/client";
import EditChessboardProvider from "./EditChessboardProvider";
import EditableChessboard from "./EditableChessboard";
import PanelInfos from "./PanelInfos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarTrigger } from "@/components/ui/sidebar";

const queryClient = new QueryClient();

const EditDirectory = ({ directory }: { directory: Directory }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <EditChessboardProvider directory={directory}>
        <div className="h-screen">
          <div className="text-3xl px-5 pt-3">
            <SidebarTrigger /> {directory.name}
          </div>
          <div className="flex">
            <EditableChessboard />
            <div className="flex-1 max-w-[48rem]">
              <PanelInfos />
            </div>
          </div>
        </div>
      </EditChessboardProvider>
    </QueryClientProvider>
  );
};

export default EditDirectory;
