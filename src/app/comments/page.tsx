import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { Comment } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormAddComment from "@/comments/components/FormAddComment";

const CommentPage = async () => {
  const comments: Comment[] = await prisma.comment.findMany();

  if (comments.length === 0) {
    return (
      <div className="space-y-3">
        <Alert>Il n&apos;y a pas de commentaire</Alert>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Ajouter un commentaire</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouveau commentaire</DialogTitle>
              <DialogDescription asChild>
                <FormAddComment />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return <div>voici la liste</div>;
};

export default CommentPage;
