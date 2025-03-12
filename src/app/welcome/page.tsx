import { auth } from "@/lib/auth";
import Title1 from "@/components/ui/title1";
import { dbg } from "@/lib/helpers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { URLS } from "../urls";

const DashboardPage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  dbg.info(session);

  return (
    <div>
      <Title1>Bienvenue sur le Dashboard</Title1>

      <div className="p-3">
        <ul>
          <li>
            <Link href={URLS.directories}>Répertoires</Link>
          </li>
          <li>
            <Link href="/comments">Commentaires</Link>
          </li>
          <li>
            <Link href="/ui">Charte graphique</Link>
          </li>
          <li>
            <Link href="/chessboard">Chessboard</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
