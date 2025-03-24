import Link from "next/link";

const CommentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto space-y-3 max-w-2xl py-3">
      {children}
      <div>
        <Link href="/">&laquo; accueil</Link>
      </div>
    </div>
  );
};

export default CommentLayout;
