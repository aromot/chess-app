"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormAddComment from "@/comments/components/FormAddComment";
import { useState } from "react";

const ButtonAddComment = () => {
  const [open, setOpen] = useState(false);

  console.log({ open });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Ajouter un commentaire</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouveau commentaire</DialogTitle>
          {/* si on retire cette balise, on a un warning :-( */}
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormAddComment
          onSuccess={() => {
            console.log("onSuccess: setOpen(false)");

            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ButtonAddComment;
