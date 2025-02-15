"use client";

import Link from "next/link";
import Title1 from "../ui/title1";
import { useSession } from "next-auth/react";
import ButtonSignIn from "../../users/SignIn/ButtonSignIn";
import ButtonSignOut from "../../users/SignOut/ButtonSignOut";
import ButtonSignUp from "@/users/SignUp/ButtonSignUp";
import { URLS } from "@/app/urls";

const Header = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-slate-300 flex items-center p-3">
      <div className="flex-1">
        <Title1>
          <Link href={session ? URLS.dashboard : URLS.homepage}>Chess App</Link>
        </Title1>
      </div>
      <div>
        {session ? (
          <ButtonSignOut />
        ) : (
          <div className="flex gap-5">
            <ButtonSignIn />
            <ButtonSignUp />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
