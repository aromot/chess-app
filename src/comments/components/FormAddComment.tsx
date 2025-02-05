"use client";

import AppForm from "@/components/forms/AppForm";
import ButtonSubmit from "@/components/forms/ButtonSubmit";
import { createComment } from "../actions";
import { useAppForm } from "@/components/forms/useAppForm";
import { CommentSchema, CommentFormValues } from "../schema";
import InputTextArea from "@/components/forms/InputTextArea";

const FormAddComment = ({ onSuccess }: { onSuccess?: () => void }) => {
  const form = useAppForm({
    schema: CommentSchema,
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: CommentFormValues) => {
    await createComment(values.content);
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

      <ButtonSubmit loadingText="ajout en cours...">
        Ajouter mon commentaire
      </ButtonSubmit>
    </AppForm>
  );
};

export default FormAddComment;
