"use client";

import AppForm from "@/components/forms/AppForm";
import ButtonSubmit from "@/components/forms/ButtonSubmit";
import { useAppForm } from "@/components/forms/useAppForm";
import { CommentSchema, CommentFormValues } from "../../_schemas/schema";
import InputTextArea from "@/components/forms/InputTextArea";
import { createComment } from "../../_actions/actions";
import { Position } from "@prisma/client";

type Props = {
  position: Position;
  onSuccess?: () => void;
};

const FormAddComment = ({ onSuccess, position }: Props) => {
  const form = useAppForm({
    schema: CommentSchema,
    defaultValues: {
      positionId: position.id,
      content: "",
    },
  });

  const onSubmit = async (values: CommentFormValues) => {
    await createComment(position.id, values.content);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <AppForm form={form} onSubmit={onSubmit} className="space-y-1">
      <InputTextArea
        // label="Votre commentaire"
        name="content"
        placeholder="ici votre commentaire"
        rows={5}
      />

      <ButtonSubmit loadingText="ajout en cours...">
        Ajouter le commentaire
      </ButtonSubmit>
    </AppForm>
  );
};

export default FormAddComment;
