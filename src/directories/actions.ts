"use server";

import { z } from "zod";
import { addDirectory } from "./db-queries";
import { DirectorySchema } from "./schema";


// Exporter les fonctions pour les utiliser dans les composants
export async function createDirectory(name: string, white: boolean) {
  try {
    const result = DirectorySchema.safeParse({ name, white });

    
    if (!result.success) {
      return {
        error: result.error.errors[0].message
      };
    }

    await addDirectory({
      name,
      white
    });

    return { success: true };

  } catch (error) {
    console.log("Une erreur s'est produite");
    console.log({ error });
    return {
      error: "Une erreur s'est produite lors de la création du répertoire"
    };
  }
}