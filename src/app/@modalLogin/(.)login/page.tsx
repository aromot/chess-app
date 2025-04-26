"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { URLS } from "@/app/urls";
import FormCredentialsSignIn from "@/app/(auth)/_components/SignIn/FormCredentialsSignIn";
import FormGoogleSignIn from "@/app/(auth)/_components/SignIn/FormGoogleSignIn";

const ModalLoginPage = () => {
  const router = useRouter();

  const handleOnChange = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOnChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Authentification</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <FormCredentialsSignIn />
        <FormGoogleSignIn />

        <div>
          <Link href={URLS.register}>Je n'ai pas de compte</Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalLoginPage;
