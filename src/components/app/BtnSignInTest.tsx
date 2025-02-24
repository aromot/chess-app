"use client";

import { signIn } from "next-auth/react";

const BtnSignInTest = () => {
  return (
    <button
      onClick={() => {
        signIn();
      }}
    >
      SignIn
    </button>
  );
};

export default BtnSignInTest;
