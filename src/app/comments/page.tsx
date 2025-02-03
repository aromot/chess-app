import { Alert } from "@/components/ui/alert";
import { Comment } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { getComments } from "@/comments/db-queries";
import Title1 from "@/components/ui/title1";
import ButtonAddComment from "@/comments/components/ButtonAddComment";
import CommentProvider from "@/comments/components/CommentProvider";

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
    <div className="container mx-auto space-y-3 max-w-2xl">
      <div className="flex">
        <Title1 className="flex-1">Liste des commentaires</Title1>
        <ButtonAddComment />
      </div>
      <CommentProvider>
        <DataTable columns={columns} data={comments} />
        {/* ici la modale pour la confirmation du delete */}
      </CommentProvider>
    </div>
  );
};

export default CommentPage;
