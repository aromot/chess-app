"use server";

import { insertMove } from "@/app/(private)/moves/_db/db-queries";
import { addPosition } from "../_db/db-queries";

export async function addMove(
  directoryId: number,
  san: string,
  fen: string,
  from: string,
  to: string,
  positionId: number
) {
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
    // console.log("new position (server action):", newPosition);

    const move = await insertMove(
      directoryId,
      san,
      from,
      to,
      positionId,
      newPosition.id
    );
    // console.log("new move (server action):", move);

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
