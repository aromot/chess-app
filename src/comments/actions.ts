"use server";

import { addComment, deleteComment } from "./db-queries";
import { z } from "zod";

const formSchema = z.object({
  content: z.string().min(2, {
    message: "Votre message doit contenir au moins 2 caractères.",
  }),
});

export async function createComment(content: string) {
  try {
    formSchema.safeParse({ content });
    await addComment(content);
    // return comment;
  } catch (error) {
    console.log("Une erreur s'est produite");
    console.log({ error });
  }

  // redirect("/comments");
}

export async function removeComment(id: number) {
  try {
    await deleteComment(id);
  } catch (error) {
    console.log("Une erreur s'est produite");
    console.log({ error });
  }
}
