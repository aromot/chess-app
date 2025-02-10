import Title1 from "@/components/ui/title1";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Title1>Chess App</Title1>
      <ul>
        <li>
          <Link href="/directories">Répertoires</Link>
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
  );
}
