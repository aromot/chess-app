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

type Props = {
  size?: "default" | "sm";
};
const ButtonAddDirectory = ({ size = "default" }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={size}>Make a new repertoire</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New repertoire</DialogTitle>
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
