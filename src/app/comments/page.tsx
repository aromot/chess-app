import { prisma } from "@/lib/db";
import { Comment } from "@prisma/client";

const CommentPage = async () => {
  const comments: Comment[] = await prisma.comment.findMany();

  if (comments.length === 0) {
    return <div>Il n&apos;y a pas de commentaire</div>;
  }

  return <div>voici la liste</div>;
};

export default CommentPage;
