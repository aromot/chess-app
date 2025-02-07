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
import FormAddComment from "@/comments/components/add/FormAddComment";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ButtonAddComment = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Ajouter</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouveau commentaire</DialogTitle>
          {/* si on retire cette balise, on a un warning :-( */}
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormAddComment
          onSuccess={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ButtonAddComment;
