"use client";

import AppForm from "@/components/forms/AppForm";
import ButtonSubmit from "@/components/forms/ButtonSubmit";
import { changeComment } from "../../actions";
import { useAppForm } from "@/components/forms/useAppForm";
import { CommentSchema, CommentFormValues } from "../../schema";
import InputTextArea from "@/components/forms/InputTextArea";
import { Comment } from "@prisma/client";

const FormEditComment = ({
  comment,
  onSuccess,
}: {
  comment: Comment;
  onSuccess?: () => void;
}) => {
  const form = useAppForm({
    schema: CommentSchema,
    defaultValues: {
      content: comment.content,
    },
  });

  const onSubmit = async (values: CommentFormValues) => {
    await changeComment(comment.id, values.content);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <AppForm form={form} onSubmit={onSubmit} className="space-y-3">
      <InputTextArea
        label="Votre commentaire"
        name="content"
        placeholder="ici votre commentaire"
      />

      <ButtonSubmit loadingText="modification en cours...">
        Modifier
      </ButtonSubmit>
    </AppForm>
  );
};

export default FormEditComment;
