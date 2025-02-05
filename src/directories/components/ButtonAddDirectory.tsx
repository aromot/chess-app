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

const ButtonAddDirectory = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Ajouter un répertoire</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouveau répertoire</DialogTitle>
          {/* Si on retire cette balise, on a un warning :-( */}
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormAddDirectory
          onSuccess={() => {
            setOpen(false); // Fermer le dialogue après un ajout réussi
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ButtonAddDirectory;
