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
import { FormAddDirectory } from "./FormAddDirectory";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ButtonAddDirectory = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Ajouter un répertoire</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouveau répertoire</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormAddDirectory
          onSuccess={() => {
            setOpen(false);
            router.refresh(); // Fermer le dialogue après un ajout réussi
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ButtonAddDirectory;
