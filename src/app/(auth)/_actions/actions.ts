"use server";

import bcrypt from "bcryptjs";
import { getUserByEmail, insertUser } from "@/app/(auth)/_db/db-queries";
import {
  SignInFormValues,
  signInSchema,
  SignUpFormValues,
  signUpSchema,
} from "../_schemas/schema";
import { signIn } from "@/lib/auth";
import { AuthError, CredentialsSignin } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { changePasswordSchema } from "@/app/(auth)/_schemas/schema";
import { updateUserPassword } from "@/app/(auth)/_db/db-queries";
import { auth } from "@/lib/auth";

// ZodType

export async function signUp(data: SignUpFormValues) {
  const validation = signUpSchema.safeParse(data);
  if (!validation.success) {
    return {
      error: "validation",
      errors: validation.error.errors,
    };
  }

  const { email, password } = validation.data;
  const user = await insertUser(email, password);

  return {
    success: true,
    user,
  };
}

export async function signInAction(data: SignInFormValues) {
  const validation = signInSchema.safeParse(data);
  if (!validation.success) {
    return {
      error: "validation",
      errors: validation.error.errors,
    };
  }

  try {
    console.log({ validation });

    const { email, password } = validation.data;

    const user = await getUserByEmail(email);
    if (!user) {
      throw new CredentialsSignin("E-mail ou mot de passe invalide.");
    }

    const isPasswordValid = bcrypt.compare(password, user.password as string);
    if (!isPasswordValid) {
      throw new CredentialsSignin("E-mail ou mot de passe invalide.");
    }
    if (!user.emailVerified) {
      // ... à faire
      // décider de comment se passe l'inscription / confirmation
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "general",
            message: "E-mail ou mot de passe invalide.",
          };
        default:
          return {
            error: "general",
            message: "Une erreur s'est produite, essayez à nouveau plus tard.",
          };
      }
    }

    if (isRedirectError(error)) {
      console.log("cool, isRedirectError is true");
      // redirect(URLS.dashboard);
      return {
        success: true,
      };
    }
  }
}

export async function changePassword(old_password: string, new_password: string, new_password_confirm: string) {
  try {
  const session = await auth();
  
  const validation = changePasswordSchema.safeParse({ old_password, new_password, new_password_confirm });
  if (!validation.success) {
    return {
      error: "validation",
      errors: validation.error.errors,
    };
  }

  const user = await getUserByEmail(session!.user?.email as string);
  if (!user) {
    return { error: "auth", message: "Utilisateur introuvable" };
  }

  const isPasswordValid = await bcrypt.compare(old_password, user.password as string);
  if (!isPasswordValid) {
    return { error: "auth", message: "Mot de passe actuel invalide" };
  }

  if (new_password !== new_password_confirm) {
    return { error: "validation", message: "Les mots de passe ne correspondent pas" };
  }

  const hashedPassword = await bcrypt.hash(new_password, 10);
  await updateUserPassword(user.id, hashedPassword);

  return {
    success: true,
  };
  } catch (error) {
    console.error("Erreur lors du changement de mot de passe:", error);
    return {
      error: "server",
      message: "Une erreur s'est produite lors du changement de mot de passe, essayez à nouveau plus tard.",
    };
  }
}