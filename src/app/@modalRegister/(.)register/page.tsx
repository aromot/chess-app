"use client";

import FormSignUp from "@/app/(auth)/_components/SignUp/FormSignUp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
