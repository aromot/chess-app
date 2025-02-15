import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { URLS } from "./urls";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect(URLS.dashboard);
  }

  return (
    <div className="p-3 text-5xl text-center">
      Bienvenue sur la page d'accueil
    </div>
  );
}
