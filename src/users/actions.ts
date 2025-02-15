"use server";

import { insertUser } from "./db-queries";
import { SignUpFormValues, signUpSchema } from "./schema";

export async function signUp(data: SignUpFormValues) {
  try {
    signUpSchema.safeParse(data);
    return await insertUser(data.email, data.password);
  } catch (error) {
    console.log("Une erreur s'est produite");
    console.log({ error });
  }
}
