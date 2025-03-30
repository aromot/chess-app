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
  fenPosInit: string,
  userId: string
) {
  try {
    const result = DirectorySchema.safeParse({
      name,
      white,
      fenPosInit,
      userId,
    });

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
      userId,
    });

    return { success: true };
  } catch (error) {
    console.log(error?.stack);
    return {
      error: "An error occurred while adding the new repertoire.",
    };
  }
}

export async function removeDirectory(id: number) {
  try {
    // delete directory and all its positions and all its moves.
    await deleteDirectory(id);
  } catch (error) {
    console.log(error?.stack);
    return {
      error: "An error occurred while deleting the repertoire.",
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
    console.log(error?.stack);
    return {
      error: "An error occurred while updating the repertoire.",
    };
  }
}
