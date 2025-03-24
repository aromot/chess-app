"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDirectory } from "../DirectoryProvider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { removeDirectory } from "../../_actions/actions";

const ModalDeleteDirectory = () => {
  const { openDelete, setOpenDelete, directory } = useDirectory();
  const router = useRouter();

  const clickDelete = async () => {
    await removeDirectory(directory.id);
    setOpenDelete(false);
    router.refresh();
  };

  return (
    <Dialog open={openDelete} onOpenChange={setOpenDelete}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer le répertoire</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Êtes-vous sûr de vouloir supprimer le répertoire ?
        </DialogDescription>

        <div className="flex">
          <div className="flex-1">
            <Button onClick={clickDelete} variant="destructive">
              Je supprime
            </Button>
          </div>
          <Button variant="link" onClick={() => setOpenDelete(false)}>
            Annuler
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDeleteDirectory;
