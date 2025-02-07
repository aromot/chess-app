"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useComment } from "./CommentProvider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { removeComment } from "../actions";

const ModalDeleteComment = () => {
  const {
    modalDeleteOpen,
    toggleModalDelete,
    closeModalDelete,
    commentDelete,
  } = useComment();
  const router = useRouter();

  const clickDelete = async () => {
    await removeComment(commentDelete.id);
    closeModalDelete();
    router.refresh();
  };

  return (
    <Dialog open={modalDeleteOpen} onOpenChange={toggleModalDelete}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer un commentaire</DialogTitle>
          {/* si on retire cette balise, on a un warning :-( */}
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>Voulez-vous vraiment supprimer ce commentaire ?</div>
        <div className="flex">
          <div className="flex-1">
            <Button onClick={clickDelete} variant="destructive">
              Je supprime
            </Button>
          </div>
          <Button variant="link" onClick={closeModalDelete}>
            Annuler
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDeleteComment;
