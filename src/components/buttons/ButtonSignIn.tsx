import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import FormSignIn from "@/users/SignIn/FormSignIn";
import FormSignUp from "@/users/SignUp/FormSignUp";

const ButtonSignIn = () => {
  const [open, setOpen] = useState(false);
  const [signUp, setSignUp] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          onClick={() => {
            setSignUp(false);
          }}
        >
          S'authentifier
        </Button>
      </DialogTrigger>

      {signUp ? (
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
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Authentification</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <FormSignIn
          // onSuccess={() => {
          //   setOpen(false);
          //   router.refresh();
          // }}
          />
          <div>
            <Button
              variant="link"
              onClick={() => {
                setSignUp(true);
              }}
            >
              Je n'ai pas de compte
            </Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default ButtonSignIn;
