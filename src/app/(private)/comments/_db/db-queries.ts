import { prisma } from "@/lib/db";

export async function getComments() {
  return await prisma.comment.findMany();
}

export async function addComment(positionId: number, content: string) {
  return prisma.comment.create({
    data: { content, positionId },
  });
}

// Supprimer un commentaire par son ID
export async function deleteComment(id: number) {
  return await prisma.comment.delete({
    where: {
      id,
    },
  });
}

// Mettre à jour un comment par son ID
export async function updateComment(id: number, content: string) {
  const comment = await prisma.comment.update({
    where: {
      id,
    },
    data: { content },
  });
  return comment;
}
