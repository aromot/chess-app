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
import { Button } from "@/components/ui/button";
import FormSignUp from "../SignUp/FormSignUp";
import FormGoogleSignIn from "./FormGoogleSignIn";
import AuthIntro from "./AuthIntro";

const ButtonSignIn = () => {
  const [open, setOpen] = useState(false);
  // signUp = true => on affiche le formulaire d'inscription
  // signUp = false => on affiche le formulaire de Sign In (=authentification)
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

          <FormSignUp />
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Authentification</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <AuthIntro />

          <FormGoogleSignIn />
          {/* <div>
            <Button
              variant="link"
              onClick={() => {
                setSignUp(true);
              }}
            >
              Je n'ai pas de compte
            </Button>
          </div> */}
        </DialogContent>
      )}
    </Dialog>
  );
};

export default ButtonSignIn;
