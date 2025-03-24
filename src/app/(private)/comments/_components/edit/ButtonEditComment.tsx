import { Button } from "@/components/ui/button";
import { useComment } from "../CommentProvider";
import { Pencil } from "lucide-react";
import { Comment } from "@prisma/client";

const ButtonEditComment = ({ comment }: { comment: Comment }) => {
  const { openModalEdit } = useComment();

  return (
    <Button
      onClick={() => openModalEdit(comment)}
      variant="ghost"
      className="h-8 w-8 p-0"
    >
      <Pencil className="h-4 w-4" />
    </Button>
  );
};

export default ButtonEditComment;
