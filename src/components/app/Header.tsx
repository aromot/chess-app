import Link from "next/link";
import Title1 from "../ui/title1";
import ButtonSignOut from "../../app/(auth)/_components/SignOut/ButtonSignOut";
import { URLS } from "@/app/urls";
import { auth } from "@/lib/auth";
import { Button } from "../ui/button";

const Header = async () => {
  const session = await auth();

  console.log("[header.tsx] session", { session });

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
            <Button asChild>
              <Link href={URLS.login}>S'authentifier</Link>
            </Button>
            {/* <ButtonSignIn /> */}
            {/* <ButtonSignUp /> */}
            <Button asChild>
              <Link href={URLS.register}>S'inscrire</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
