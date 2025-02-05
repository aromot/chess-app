"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AppForm from "@/components/forms/AppForm";
import ButtonSubmit from "@/components/forms/ButtonSubmit";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../actions";
import { useAppForm } from "@/components/forms/useAppForm";
import { CommentSchema, CommentFormValues } from "../schema";

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
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Votre commentaire</FormLabel>
            <FormControl>
              <Textarea placeholder="ici votre commentaire" {...field} />
            </FormControl>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <ButtonSubmit loadingText="ajout en cours...">
        Ajouter mon commentaire
      </ButtonSubmit>
    </AppForm>
  );
};

export default FormAddComment;
