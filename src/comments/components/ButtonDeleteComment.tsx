import { Button } from "@/components/ui/button";
import { useComment } from "./CommentProvider";
import { X } from "lucide-react";
import { Comment } from "@prisma/client";

const ButtonDeleteComment = ({ comment }: { comment: Comment }) => {
  const { openModalDelete } = useComment();

  return (
    <Button
      onClick={() => openModalDelete(comment)}
      variant="ghost"
      className="h-6 w-6 p-0"
    >
      <span className="sr-only">Actions</span>
      <X className="h-4 w-4" />
    </Button>
  );
};

export default ButtonDeleteComment;
