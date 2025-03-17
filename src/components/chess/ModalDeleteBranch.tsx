"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useChessboard } from "./ChessboardProvider";
import { Move } from "@prisma/client";
import { removeBranch } from "@/app/moves/_actions/actions";

type Props = {
  onSuccess?: (move: Move) => void;
};

const ModalDeleteBranch = ({ onSuccess }: Props) => {
  const {
    modalDelBranchOpen,
    toggleModalDeleteBranch,
    closeModalDeleteBranch,
    moveDelete,
  } = useChessboard();

  const clickDelete = async () => {
    if (!moveDelete) {
      alert("No branch to delete!");
      throw new Error("No branch to delete!");
    }
    await removeBranch(moveDelete.id as number);
    closeModalDeleteBranch();
    if (onSuccess) {
      onSuccess(moveDelete);
    }
  };

  if (!moveDelete) return;

  return (
    <Dialog open={modalDelBranchOpen} onOpenChange={toggleModalDeleteBranch}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer une branche</DialogTitle>
          {/* si on retire cette balise, on a un warning :-( */}
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          ATTENTION, voulez-vous vraiment supprimer cette branche (y compris ses
          commentaires) ?
        </div>
        <div className="flex">
          <div className="flex-1">
            <Button onClick={clickDelete} variant="destructive">
              Je supprime la branche
            </Button>
          </div>
          <Button variant="link" onClick={closeModalDeleteBranch}>
            Annuler
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDeleteBranch;
