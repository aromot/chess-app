"use client";

import { DialogDescription, DialogFooter } from "@/components/ui/dialog";

import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { removeDirectory } from "../../actions";
import { Directory } from "@prisma/client";
import { useState } from "react";
import { DialogTrigger } from "@/components/ui/dialog";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

const ButtonDeleteDirectory = ({ directory }: { directory: Directory }) => {
  const router = useRouter();
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const closeModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await removeDirectory(directory.id);
    setIsDeleting(false);
    router.refresh();
  };
  return (
    <Dialog open={openModalDelete} onOpenChange={setOpenModalDelete}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <Trash size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer le répertoire</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Êtes-vous sûr de vouloir supprimer le répertoire ?
        </DialogDescription>
        <DialogFooter>
          <Button variant="destructive" onClick={handleDelete}>
            Supprimer
          </Button>
          <Button variant="outline" onClick={closeModalDelete}>
            Annuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonDeleteDirectory;
