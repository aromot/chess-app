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
    <div className="h-screen">
      <div className="text-2xl md:text-3xl px-1 pt-1">
        <SidebarTrigger /> {directory.name}
      </div>
      <QueryClientProvider client={queryClient}>
        <EditChessboardProvider directory={directory}>
          <div className="sm:flex">
            <EditableChessboard />
            <div className="flex-1 max-w-[48rem]">
              <PanelInfos />
            </div>
          </div>
        </EditChessboardProvider>
      </QueryClientProvider>
    </div>
  );
};

export default EditDirectory;
