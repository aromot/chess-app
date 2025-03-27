"use client";

import AppForm from "@/components/forms/AppForm";
import ButtonSubmit from "@/components/forms/ButtonSubmit";
import { useAppForm } from "@/components/forms/useAppForm";
import { CommentSchema, CommentFormValues } from "../../_schemas/schema";
import InputTextArea from "@/components/forms/InputTextArea";
import { Comment } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { changeComment } from "../../_actions/actions";

type Props = {
  comment: Comment;
  onSuccess?: () => void;
  onCancel?: () => void;
};

const FormEditComment = ({ comment, onSuccess, onCancel }: Props) => {
  const form = useAppForm({
    schema: CommentSchema,
    defaultValues: {
      positionId: comment.positionId,
      content: comment.content,
    },
  });
  // const { closeModalEdit } = useComment();

  const onSubmit = async (values: CommentFormValues) => {
    await changeComment(comment.id, values.content);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <AppForm form={form} onSubmit={onSubmit} className="space-y-1">
      <InputTextArea
        label="Your comment"
        name="content"
        placeholder="write your comment here"
      />

      <div className="flex">
        <div className="flex-1">
          <ButtonSubmit loadingText="updating...">Update</ButtonSubmit>
        </div>
        {onCancel && (
          <div>
            <Button variant="link" onClick={onCancel}>
              cancel
            </Button>
          </div>
        )}
      </div>
    </AppForm>
  );
};

export default FormEditComment;
