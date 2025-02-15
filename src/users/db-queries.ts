import { prisma } from "@/lib/db";

export async function insertUser(email: string, password: string) {
  return prisma.user.create({
    data: {
      email,
      password,
    },
  });
}
