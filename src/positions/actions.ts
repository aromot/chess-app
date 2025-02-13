"use server";

import { insertMove } from "@/moves/db-queries";
import { addPosition } from "./db-queries";

export async function addMove(
  directoryId: number,
  san: string,
  fen: string,
  positionId: number
) {
  console.log("[addMove]", { directoryId, san, fen, positionId });

  try {
    // const result = DirectorySchema.safeParse({ name, white });

    // console.log({ result });

    // if (!result.success) {
    //   return {
    //     error: result.error.errors[0].message,
    //   };
    // }

    // TODO vérifie si le coup existe déjà

    const newPosition = await addPosition(directoryId, fen);
    console.log("new position (server action):", newPosition);

    const move = await insertMove(san, positionId, newPosition.id);
    console.log("new move (server action):", move);

    return [newPosition, move];
  } catch (error) {
    console.log("Une erreur s'est produite");
    console.log({ error });
    return {
      error:
        "Une erreur s'est produite lors de l'insertion d'une position + move",
    };
  }
}
