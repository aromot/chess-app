import Link from "next/link";

export default function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/directories">Répertoires</Link>
        </li>
        <li>
          <Link href="/comments">Commentaires</Link>
        </li>
      </ul>
    </div>
  );
}
