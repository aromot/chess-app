import { Alert } from "@/components/ui/alert";
import { Comment } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { getComments } from "@/comments/db-queries";
import Title1 from "@/components/ui/title1";
import ButtonAddComment from "@/comments/components/ButtonAddComment";

const CommentPage = async () => {
  const comments: Comment[] = await getComments();

  if (comments.length === 0) {
    return (
      <div className="space-y-3">
        <Alert>Il n&apos;y a pas de commentaire</Alert>
        <ButtonAddComment />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 space-y-3">
      <Title1>Liste des commentaires</Title1>
      <DataTable columns={columns} data={comments} />
      <ButtonAddComment />
    </div>
  );
};

export default CommentPage;
