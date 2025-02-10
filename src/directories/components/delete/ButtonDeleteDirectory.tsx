"use client";

import { useState } from "react";
import { Directory } from "@prisma/client";
import { useRouter } from "next/navigation";
import { removeDirectory } from "@/directories/actions";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  directory: Directory;
}

const ButtonDeleteDirectory: React.FC<Props> = ({ directory }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    await removeDirectory(directory.id);
    setIsDeleting(false);
    router.refresh();
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={isDeleting}
      className="h-8 w-8 p-0"
    >
      <Trash className="h-4 w-4" />

      {isDeleting ? "Suppression en cours..." : ""}
    </Button>
  );
};

export default ButtonDeleteDirectory;
