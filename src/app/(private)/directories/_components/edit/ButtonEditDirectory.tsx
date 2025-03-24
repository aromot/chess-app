"use client";

import { Button } from "@/components/ui/button";
import { Directory } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useDirectory } from "../DirectoryProvider";

interface Props {
  directory: Directory;
}

const ButtonEditDirectory: React.FC<Props> = ({ directory }) => {
  const { openEditDirectory } = useDirectory();

  return (
    <Button
      variant="ghost"
      className="h-8 w-8 p-0"
      onClick={() => openEditDirectory(directory)}
    >
      <Pencil size={16} />
    </Button>
  );
};

export default ButtonEditDirectory;
