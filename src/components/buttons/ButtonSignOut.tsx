"use client";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

const ButtonSignOut = () => {
  return <Button onClick={() => signOut()}>Se déconnecter</Button>;
};

export default ButtonSignOut;
