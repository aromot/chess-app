import Link from "next/link";

const DirectoryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <div>
        <Link href="/">&laquo; accueil</Link>
      </div>
    </>
  );
};

export default DirectoryLayout;
