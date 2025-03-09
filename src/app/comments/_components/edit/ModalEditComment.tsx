"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useComment } from "../CommentProvider";
import { useRouter } from "next/navigation";
import FormEditComment from "./FormEditComment";

const ModalEditComment = () => {
  const { modalEditOpen, toggleModalEdit, closeModalEdit, commentEdit } =
    useComment();
  const router = useRouter();

  if (!commentEdit) return;

  return (
    <Dialog open={modalEditOpen} onOpenChange={toggleModalEdit}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer un commentaire</DialogTitle>
          {/* si on retire cette balise, on a un warning :-( */}
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormEditComment
          comment={commentEdit}
          onSuccess={() => {
            closeModalEdit();
            router.refresh();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditComment;
