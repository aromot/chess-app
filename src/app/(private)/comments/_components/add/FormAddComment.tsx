"use client";

import AppForm from "@/components/forms/AppForm";
import ButtonSubmit from "@/components/forms/ButtonSubmit";
import { useAppForm } from "@/components/forms/useAppForm";
import { CommentSchema, CommentFormValues } from "../../_schemas/schema";
import InputTextArea from "@/components/forms/InputTextArea";
import { createComment } from "../../_actions/actions";
import { Directory, Position } from "@prisma/client";

type Props = {
  directory: Directory;
  position: Position;
  onSuccess?: () => void;
};

const FormAddComment = ({ onSuccess, position, directory }: Props) => {
  const form = useAppForm({
    schema: CommentSchema,
    defaultValues: {
      positionId: position.id,
      content: "",
    },
  });

  const onSubmit = async (values: CommentFormValues) => {
    await createComment(directory.id, position.id, values.content);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <AppForm form={form} onSubmit={onSubmit} className="space-y-1">
      <InputTextArea
        name="content"
        placeholder="write your comment here"
        rows={5}
      />

      <ButtonSubmit loadingText="adding...">Add comment</ButtonSubmit>
    </AppForm>
  );
};

export default FormAddComment;
