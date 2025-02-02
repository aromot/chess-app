import { prisma } from "@/lib/db";

export async function getComments() {
  return await prisma.comment.findMany();
}

export async function addComment(content: string) {
  const createdAt = new Date().toISOString();

  return prisma.comment.create({
    data: { content, createdAt },
  });
}
