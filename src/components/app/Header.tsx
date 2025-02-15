"use client";

import Link from "next/link";
import Title1 from "../ui/title1";
import { useSession } from "next-auth/react";
import ButtonSignIn from "../buttons/ButtonSignIn";
import ButtonSignOut from "../buttons/ButtonSignOut";
import { dbg } from "@/lib/helpers";

const Header = () => {
  const { data: session } = useSession();

  dbg.info(session);

  return (
    <nav className="bg-slate-300 flex items-center p-3">
      <div className="flex-1">
        <Title1>
          <Link href="/">Chess App</Link>
        </Title1>
      </div>
      <div>{session ? <ButtonSignOut /> : <ButtonSignIn />}</div>
    </nav>
  );
};

export default Header;
