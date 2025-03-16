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
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Database error");
  }
}

export async function updateUserPassword(id: string, password: string) {
  try {
    return await prisma.user.update({
      where: { id },
      data: { password },
    });
  } catch (error) {
    console.error("Error updating password:", error);
    throw new Error("Database error");
  }
}
