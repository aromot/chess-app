"use server";

import { addComment, deleteComment, updateComment } from "../_db/db-queries";
import { CommentSchema } from "../_schemas/schema";

export async function createComment(positionId: number, content: string) {
  try {
    CommentSchema.safeParse({ content });
    await addComment(positionId, content);
    // return comment;
  } catch (error) {
    console.log("Une erreur s'est produite");
    console.log({ error });
  }
}

export async function changeComment(id: number, content: string) {
  try {
    CommentSchema.safeParse({ content });
    await updateComment(id, content);
    // return comment;
  } catch (error) {
    console.log("Une erreur s'est produite");
    console.log({ error });
  }
}

export async function removeComment(id: number) {
  try {
    await deleteComment(id);
  } catch (error) {
    console.log("Une erreur s'est produite");
    console.log({ error });
  }
}
