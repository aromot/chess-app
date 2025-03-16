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
import { FormChangePassword } from "@/app/(auth)/_components/ChangePassword/FormChangePassword";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ButtonChangePassword = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-slate-300">Modifier le mot de passe</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le mot de passe</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <FormChangePassword
            onSuccess={() => {
              setOpen(false);
              router.refresh(); // Fermer le dialogue après un ajout réussi
            }} />
        </DialogContent>
      </Dialog>
    );
  };
export default ButtonChangePassword;
