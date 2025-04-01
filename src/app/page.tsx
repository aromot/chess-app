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

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect(URLS.dashboard);
  }

  const directory = await getDirectoryByName("HOMEPAGE");

  return (
    <div className="flex h-screen">
      <div className="p-20 w-[48%]">
        {directory ? (
          <ChessboardDemo directory={directory as Directory} />
        ) : (
          <GeneralError>Error while loading the chessboard.</GeneralError>
        )}
      </div>
      <div className="flex-1 py-10 text-white pr-20 mt-10">
        <div className="flex items-end gap-10">
          <Image
            src="/logo-outline.svg"
            width={110}
            height={141}
            alt="Chess App"
          />
          <div>
            <div className="text-7xl">Billie Chess</div>
            <div className="text mt-3" style={{ letterSpacing: ".5rem" }}>
              Prepare your openings
            </div>
          </div>
        </div>

        <div className="my-20 text-justify">
          Build your repertory, study to get well prepared. Share your games.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt unde
          ullam quos dicta provident! Aperiam assumenda, dolor doloremque
          explicabo illum, nisi iure praesentium optio voluptatum provident
          molestias qui quae delectus.
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
}
