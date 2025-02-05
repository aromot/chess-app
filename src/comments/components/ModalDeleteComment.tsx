"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useComment } from "./CommentProvider";

const ModalDeleteComment = () => {
  const { modalDeleteOpen, toggleModalDelete } = useComment();

  return (
    <Dialog open={modalDeleteOpen} onOpenChange={toggleModalDelete}>
      {/* <DialogTrigger asChild>
        <Button>Ajouter</Button>
      </DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer un commentaire</DialogTitle>
          {/* si on retire cette balise, on a un warning :-( */}
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>Voulez-vous vraiment supprimer ce commentaire ?</div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDeleteComment;
