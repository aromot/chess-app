"use server";

import {
  addDirectory,
  deleteDirectory,
  updateDirectory,
} from "../_db/db-queries";
import { DirectorySchema } from "../_schemas/schema";

// Exporter les fonctions pour les utiliser dans les composants
export async function createDirectory(
  name: string,
  white: boolean,
  fenPosInit: string
) {
  try {
    const result = DirectorySchema.safeParse({ name, white, fenPosInit });

    console.log({ result });

    if (!result.success) {
      return {
        error: result.error.errors[0].message,
      };
    }

    // Add the directory
    // + add the initial position of the directory, which is the root of the tree of positions.
    await addDirectory({
      name,
      white,
      fenPosInit,
    });

    return { success: true };
  } catch (error) {
    console.log("Une erreur s'est produite");
    console.log(error?.stack);
    return {
      error: "Une erreur s'est produite lors de la création du répertoire",
    };
  }
}

export async function removeDirectory(id: number) {
  try {
    // delete directory and all its positions and all its moves.
    await deleteDirectory(id);
  } catch (error) {
    console.log("Une erreur s'est produite");
    console.log(error);
    return {
      error: "Une erreur s'est produite lors de la suppression du répertoire",
    };
  }
}

export async function editDirectory(id: number, name: string, white: boolean) {
  try {
    const result = DirectorySchema.safeParse({ name, white });

    if (!result.success) {
      return {
        error: result.error.errors[0].message,
      };
    }

    await updateDirectory(id, { name, white });
  } catch (error) {
    console.log("Une erreur s'est produite");
    console.log({ error });
    return {
      error: "Une erreur s'est produite lors de la modification du répertoire",
    };
  }
}
