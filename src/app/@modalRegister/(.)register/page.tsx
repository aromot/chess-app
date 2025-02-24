"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormSignUp from "@/users/SignUp/FormSignUp";
import { useRouter } from "next/navigation";

const ModalRegisterPage = () => {
  const router = useRouter();

  const handleOnChange = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOnChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Inscription</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <FormSignUp />
      </DialogContent>
    </Dialog>
  );
};

export default ModalRegisterPage;
