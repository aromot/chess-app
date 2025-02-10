"use server";

import { addDirectory, deleteDirectory, updateDirectory } from "./db-queries";
import { DirectorySchema } from "./schema";

// Exporter les fonctions pour les utiliser dans les composants
export async function createDirectory(name: string, white: boolean) {
  try {
    const result = DirectorySchema.safeParse({ name, white });

    if (!result.success) {
      return {
        error: result.error.errors[0].message,
      };
    }

    await addDirectory({
      name,
      white,
    });

    return { success: true };
  } catch (error) {
    console.log("Une erreur s'est produite");
    console.log({ error });
    return {
      error: "Une erreur s'est produite lors de la création du répertoire",
    };
  }
}

export async function removeDirectory(id: number) {
  try {
    await deleteDirectory(id);
  } catch (error) {
    console.log("Une erreur s'est produite");
    console.log({ error });
    return {
      error: "Une erreur s'est produite lors de la suppression du répertoire",
    };
  }
}

export async function editDirectory(id: number, name: string, white: boolean) {
  try {
    await updateDirectory(id, { name, white });
  } catch (error) {
    console.log("Une erreur s'est produite");
    console.log({ error });
    return {
      error: "Une erreur s'est produite lors de la modification du répertoire",
    };
  }
}
