import { Comment, PrismaClient } from "@prisma/client";

const CommentPage = async () => {
  const prisma = new PrismaClient();
  const comments: Comment[] = await prisma.comment.findMany();

  console.log({ comments });

  if (comments.length === 0) {
    return <div>Il n&apos;y a pas de commentaire</div>;
  }

  return <div>voici la liste</div>;
};

export default CommentPage;
