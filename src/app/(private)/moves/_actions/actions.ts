"use server";

import { Move, Position } from "@prisma/client";
import { findMoveOrThrow, selectMovesOfDirectory } from "../_db/db-queries";
import { selectPositionsOfDirectory } from "@/app/(private)/positions/_db/db-queries";
import { prisma } from "@/lib/db";

export async function removeBranch(moveId: number) {
  const move = await findMoveOrThrow(moveId);
  const directoryId = move.directoryId;

  const positions = await selectPositionsOfDirectory(directoryId);
  const moves = await selectMovesOfDirectory(directoryId);

  const findPosAfterMove = (move: Move) => {
    return positions.find((pos: Position) => pos.id === move.nextPositionId);
  };
  const getChildrenMoves = (pos: Position) => {
    return moves.filter((move: Move) => move.positionId === pos.id);
  };

  const delMoves: Move[] = [];
  const delPositions: Position[] = [];

  const processMove = (move: Move) => {
    delMoves.push(move);
    const nextPos = findPosAfterMove(move);
    if (!nextPos) {
      return;
    }
    delPositions.push(nextPos);
    const nextMoves = getChildrenMoves(nextPos);
    nextMoves.forEach((move: Move) => {
      processMove(move);
    });
  };

  processMove(move);

  const moveIds = delMoves.map((m) => m.id);
  const posIds = delPositions.map((m) => m.id);

  console.log("delMoves: " + moveIds.join(", "));
  console.log("delPositions: " + posIds.join(", "));

  await prisma.$transaction(async (tx) => {
    await tx.comment.deleteMany({
      where: {
        positionId: {
          in: posIds,
        },
      },
    });

    await tx.move.deleteMany({
      where: {
        id: {
          in: moveIds,
        },
      },
    });

    await tx.position.deleteMany({
      where: {
        id: {
          in: posIds,
        },
      },
    });

    await tx.directory.update({
      where: {
        id: directoryId,
      },
      data: {
        updatedAt: new Date(),
      },
    });
  });
}
