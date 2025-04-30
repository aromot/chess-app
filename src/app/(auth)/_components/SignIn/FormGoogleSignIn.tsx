"use client";
import Image from "next/image";
import { signInGoogleAction } from "../../_actions/actions";
import { Button } from "@/components/ui/button";
import GoogleLogo from "../../../../../public/google.svg";

const FormGoogleSignIn = () => {
  return (
    <form action={signInGoogleAction}>
      <div className="text-center">
        <Button variant="secondary" type="submit" className="pr-8">
          <Image
            src={GoogleLogo}
            alt="Authenticate with Google"
            style={{
              width: "32px",
              height: "32px",
            }}
          />
          Authenticate with Google
        </Button>
      </div>
    </form>
  );
};

export default FormGoogleSignIn;
