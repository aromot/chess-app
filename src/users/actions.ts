"use server";

import { insertUser } from "./db-queries";
import { SignUpFormValues, signUpSchema } from "./schema";

export async function signUp(data: SignUpFormValues) {
  console.log("signUp", { data });

  const validation = signUpSchema.safeParse(data);
  if (!validation.success) {
    return {
      error: "validation",
      errors: validation.error.errors,
    };
  }

  throw new Error("Voici une erreur !");

  return await insertUser(data.email, data.password);
}
