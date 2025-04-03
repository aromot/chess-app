import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { URLS } from "./urls";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getDirectoryByName } from "./(private)/directories/_db/db-queries";
import ChessboardDemo from "@/components/chess/home/ChessboardDemo";
import { Directory } from "@prisma/client";
import GeneralError from "@/components/errors/GeneralError";

const Contents = () => {
  return (
    <div className="flex-1 text-white flex flex-col">
      <div className="pt-3">
        <div className="flex items-end gap-10">
          <Image
            src="/logo-outline.svg"
            width={110}
            height={141}
            alt="Chess App"
          />
          <div>
            <div className="text-7xl">Billie Chess</div>
            <div className="text mt-3 ml-2" style={{ letterSpacing: ".5rem" }}>
              Prepare your openings
            </div>
          </div>
        </div>

        <div className="mt-20 mb-16 text-2xl text-justify">
          <div className="mb-10">
            Build your own chess repertoire...
            <br />
            Billie Chess proposes a personnalized interactive training!
          </div>
          <div>
            Whether you're a beginner or advanced player, this app turns opening
            theory into a powerful tool for success on the board.
          </div>
        </div>

        <div className="flex">
          <div className="mt-10 flex-1 text-center">
            <Button asChild size="xl" className="text-3xl">
              <Link href={URLS.login}>Sign in</Link>
            </Button>
          </div>
          <div className="mt-10 flex-1 text-center">
            <Button asChild size="xl" className="text-3xl">
              <Link href={URLS.register}>Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect(URLS.dashboard);
  }

  const directory = await getDirectoryByName("HOMEPAGE");

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex gap-5 w-[78rem]">
        {directory ? (
          <ChessboardDemo directory={directory as Directory} />
        ) : (
          <div>
            <GeneralError>Error while loading the chessboard.</GeneralError>
          </div>
        )}
        <Contents />
      </div>
    </div>
  );
}
