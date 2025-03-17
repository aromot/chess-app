"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useComment } from "../CommentProvider";
import { Button } from "@/components/ui/button";
import { removeComment } from "../../_actions/actions";
import { Comment } from "@prisma/client";

type Props = {
  onSuccess?: (comment: Comment) => void;
};

const ModalDeleteComment = ({ onSuccess }: Props) => {
  const {
    modalDeleteOpen,
    toggleModalDelete,
    closeModalDelete,
    commentDelete,
  } = useComment();

  const clickDelete = async () => {
    if (!commentDelete) {
      alert("No comment to delete!");
      throw new Error("No comment to delete!");
    }
    await removeComment(commentDelete.id as number);
    closeModalDelete();
    if (onSuccess) {
      onSuccess(commentDelete);
    }
  };

  if (!commentDelete) return;

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
