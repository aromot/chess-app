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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormEditDirectory } from "./FormEditDirectory";
import { Directory } from "@prisma/client";
import { Pencil } from "lucide-react";

interface Props {
  directory: Directory;
}

const ButtonEditDirectory: React.FC<Props> = ({ directory }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <Pencil size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le répertoire</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormEditDirectory
          directory={directory}
          onSuccess={() => {
            setOpen(false);
            router.refresh(); // Fermer le dialogue après un ajout réussi
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ButtonEditDirectory;
