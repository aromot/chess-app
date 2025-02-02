"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AppForm from "@/components/forms/AppForm";

const formSchema = z.object({
  content: z.string().min(2, {
    message: "Votre message doit contenir au moins 2 caractères.",
  }),
});

const FormAddComment = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <AppForm form={form} onSubmit={onSubmit} className="space-y-8">
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Votre commentaire</FormLabel>
            <FormControl>
              <Input placeholder="ici votre commentaire" {...field} />
            </FormControl>
            {/* <FormDescription>description</FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Ajouter mon commentaire</Button>
    </AppForm>
  );
};

export default FormAddComment;
