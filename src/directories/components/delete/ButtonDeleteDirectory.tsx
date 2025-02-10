"use client";

import { Directory } from "@prisma/client";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDirectory } from "../DirectoryProvider";

const ButtonDeleteDirectory = ({ directory }: { directory: Directory }) => {
  const { openDeleteDirectory } = useDirectory();

  return (
    <Button
      onClick={() => openDeleteDirectory(directory)}
      variant="ghost"
      className="h-8 w-8 p-0"
    >
      <Trash size={16} />
    </Button>
  );
};

export default ButtonDeleteDirectory;
