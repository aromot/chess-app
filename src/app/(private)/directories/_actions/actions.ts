"use server";

import { Directory } from "@prisma/client";
import {
  addDirectory,
  deleteDirectory,
  getDirectory,
  updateDirectory,
} from "../_db/db-queries";
import { DirectoryEditSchema, DirectorySchema } from "../_schemas/schema";
import { checkAuth } from "@/lib/helpers";

// Exporter les fonctions pour les utiliser dans les composants
export async function createDirectory(
  name: string,
  white: string,
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
      white: white === "true",
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
  const session = await checkAuth();

  try {
    // check if the directory belongs to the authenticated user.
    const directory: Directory | null = await getDirectory(id);
    if (directory?.userId !== session.user?.id) {
      return {
        error: "An error occurred while accessing the repertoire.",
      };
    }

    // delete directory and all its positions and all its moves.
    await deleteDirectory(id);
  } catch (error) {
    console.log(error?.stack);
    return {
      error: "An error occurred while deleting the repertoire.",
    };
  }
}

export async function editDirectory(id: number, name: string, white: string) {
  const session = await checkAuth();

  try {
    const result = DirectoryEditSchema.safeParse({ id, name, white });

    if (!result.success) {
      return {
        error: result.error.errors[0].message,
      };
    }

    // check if the directory belongs to the authenticated user.
    const directory: Directory | null = await getDirectory(id);
    if (directory?.userId !== session.user?.id) {
      return {
        error: "An error occurred while accessing the repertoire.",
      };
    }

    await updateDirectory(id, { name, white: white === "true" });
  } catch (error) {
    console.log(error?.stack);
    return {
      error: "An error occurred while updating the repertoire.",
    };
  }
}
