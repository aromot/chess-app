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

const Title = () => {
  return (
    <div className="flex items-end gap-3 xl:gap-10">
      <Image
        src="/logo-outline.svg"
        width={110}
        height={141}
        alt="Billie Chess"
      />
      <div>
        <div className="text-5xl xl:text-7xl">Billie Chess</div>
        <div className="text mt-3 ml-2 tracking-widest">
          Prepare your openings
        </div>
      </div>
    </div>
  );
};

const Contents = () => {
  return (
    <div className="flex-1 text-white flex flex-col">
      <div className="pt-3">
        <div className="hidden md:block">
          <Title />
        </div>

        <div className="md:mt-10 xl:mt-20 mb-10 xl:mb-16 pl-4 md:pl-0 pr-4 lg:pr-0 text-2xl text-justify">
          <div className="mb-10">
            Build your own chess repertoire...
            <br />
            Billie Chess proposes a{" "}
            <span className="underline underline-offset-8">
              personnalized interactive training!
            </span>
          </div>
          <div>
            Whether you're a beginner or advanced player, this app turns opening
            theory into a powerful tool for success on the board.
          </div>
        </div>

        <div className="flex mb-8 md:mb-0">
          <div className="flex-1 text-center">
            <Button asChild size="xl" className="text-2xl lg:text-3xl">
              <Link href={URLS.login}>Sign in</Link>
            </Button>
          </div>
          <div className="flex-1 text-center">
            <Button asChild size="xl" className="text-2xl lg:text-3xl">
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
      <div className="flex flex-col md:flex-row gap-5 lg:w-[60rem] xl:w-[70rem] 2xl:w-[78rem]">
        <div className="md:hidden">
          <Title />
        </div>
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
