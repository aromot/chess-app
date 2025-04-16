import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { URLS } from "./urls";
import { getDirectoryByName } from "./(private)/directories/_db/db-queries";
import ChessboardDemo from "@/components/chess/home/ChessboardDemo";
import { Directory } from "@prisma/client";
import GeneralError from "@/components/errors/GeneralError";
import HomepageContents from "./_homepage/HomepageContents";
import HomepageTitle from "./_homepage/HomepageTitle";

export default async function Home() {
  const session = await auth();

  // if (session?.user) {
  //   redirect(URLS.dashboard);
  // }

  const directory = await getDirectoryByName("HOMEPAGE");

  return (
    <div className="md:h-screen w-full flex items-center justify-center">
      <div className="md:flex md:flex-row xl:gap-5 lg:w-[60rem] xl:w-[70rem] 2xl:w-[78rem]">
        <div className="md:hidden mt-1">
          <HomepageTitle />
        </div>
        {directory ? (
          <ChessboardDemo directory={directory as Directory} />
        ) : (
          <div>
            <GeneralError>Error while loading the chessboard.</GeneralError>
          </div>
        )}
        <HomepageContents />
      </div>
    </div>
  );
}
