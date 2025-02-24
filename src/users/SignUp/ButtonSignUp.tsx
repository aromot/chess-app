"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../components/ui/button";
import FormSignUp from "@/users/SignUp/FormSignUp";

const ButtonSignUp = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">S'inscrire</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Inscription</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <FormSignUp
        // onSuccess={() => {
        //   setOpen(false);
        //   router.refresh();
        // }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ButtonSignUp;
