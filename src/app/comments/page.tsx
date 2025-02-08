import { Alert } from "@/components/ui/alert";
import { Comment } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { getComments } from "@/comments/db-queries";
import Title1 from "@/components/ui/title1";
import ButtonAddComment from "@/comments/components/add/ButtonAddComment";
import CommentProvider from "@/comments/components/CommentProvider";
import ModalDeleteComment from "@/comments/components/delete/ModalDeleteComment";
import ModalEditComment from "@/comments/components/edit/ModalEditComment";
import ButtonRefresh from "@/comments/components/ButtonRefresh";

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
    <>
      <div className="flex">
        <Title1 className="flex-1">Liste des commentaires</Title1>
        <div className="flex gap-5">
          <ButtonRefresh />
          <ButtonAddComment />
        </div>
      </div>
      <CommentProvider>
        <DataTable columns={columns} data={comments} />
        <ModalDeleteComment />
        <ModalEditComment />
      </CommentProvider>
    </>
  );
};

export default CommentPage;
