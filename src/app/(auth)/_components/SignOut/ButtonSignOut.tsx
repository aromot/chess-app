"use client";
import { signOut } from "next-auth/react";
import { Button } from "../../../../components/ui/button";

const ButtonSignOut = () => {
  return (
    <Button variant="secondary" onClick={() => signOut()}>
      Se déconnecter
    </Button>
  );
};

export default ButtonSignOut;
