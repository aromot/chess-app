import UI from "./ui";
import Link from "next/link";
import { checkAuth } from "@/lib/helpers";

const UiPage = async () => {
  await checkAuth("admin");

  return (
    <div className="p-5">
      <UI />

      <div>
        <Link href="/">&laquo; accueil</Link>
      </div>
    </div>
  );
};

export default UiPage;
