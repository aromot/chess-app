"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AppForm from "@/components/forms/AppForm";
import ButtonSubmit from "@/components/forms/ButtonSubmit";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../actions";
import { Comment } from "@prisma/client";

const formSchema = z.object({
  content: z.string().min(2, {
    message: "Votre message doit contenir au moins 2 caractères.",
  }),
});

const FormAddComment = ({
  onSuccess,
}: {
  onSuccess?: (comment: Comment) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const comment = (await createComment(values.content)) as Comment;
    if (onSuccess) {
      onSuccess(comment);
    }
  }

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
            {/* <FormDescription>description</FormDescription> */}
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
