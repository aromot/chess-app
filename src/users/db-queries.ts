import { prisma } from "@/lib/db";
import { saltAndHashPassword } from "@/lib/helpers";

export async function insertUser(email: string, passwordClear: string) {
  const passwordEncrypted = await saltAndHashPassword(passwordClear);

  return prisma.user.create({
    data: {
      email,
      password: passwordEncrypted,
    },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}
