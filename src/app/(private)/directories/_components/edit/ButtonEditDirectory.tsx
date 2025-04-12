"use client";

import { Button } from "@/components/ui/button";
import { Directory } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useDirectory } from "../DirectoryProvider";

interface Props {
  variant?: "ghost" | "default";
  directory: Directory;
}

const ButtonEditDirectory: React.FC<Props> = ({
  directory,
  variant = "ghost",
}) => {
  const { openEditDirectory } = useDirectory();

  return (
    <Button
      variant={variant}
      className="h-8 w-8 p-0"
      onClick={() => openEditDirectory(directory)}
    >
      <Pencil size={16} />
    </Button>
  );
};

export default ButtonEditDirectory;
