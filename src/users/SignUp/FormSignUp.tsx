"use client";

import { useAppForm } from "@/components/forms/useAppForm";
import { SignUpFormValues, signUpSchema } from "../schema";
import { dbg } from "@/lib/helpers";
import AppForm from "@/components/forms/AppForm";
import EmailInput from "@/components/forms/EmailInput";
import PasswordInput from "@/components/forms/PasswordInput";
import ButtonSubmit from "@/components/forms/ButtonSubmit";
import { signUp } from "../actions";
import { signIn } from "next-auth/react";
import FormGeneralError from "@/components/forms/FormGeneralError";
import { ZodIssue } from "zod";

export class ValidationError extends Error {}

const FormSignUp = () => {
  const form = useAppForm({
    schema: signUpSchema,
    defaultValues: {
      email: "",
      password: "",
      password_confirm: "",
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    dbg.info({ ...values });

    try {
      if (values.password !== values.password_confirm) {
        form.setError("password_confirm", {
          type: "manual",
          message: "Erreur de confirmation de mot de passe",
        });
        return;
      }

      // Inscris l'utilisateur
      const res = await signUp(values);
      if (res?.error == "validation") {
        res.errors.forEach((err: ZodIssue) => {
          err.path.forEach((path) => {
            form.setError(path, {
              type: "manual",
              message: err.message,
            });
          });
        });
      }

      // Authentifie-le automatiquement
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirectTo: "/",
      });
    } catch (error) {
      console.log({ error });

      form.setError("root", {
        message: "Une erreur s'est produite, essayez à nouveau plus tard.", //error.message,
      });
    }

    // if (onSuccess) {
    //   onSuccess();
    // }
  };

  return (
    <AppForm form={form} onSubmit={onSubmit} className="space-y-3">
      <FormGeneralError />

      <EmailInput
        label="E-mail"
        name="email"
        placeholder="Votre adresse e-mail"
      />
      <PasswordInput
        label="Mot de passe"
        name="password"
        placeholder="Votre mot de passe"
      />
      <PasswordInput
        label="Confirmation de votre mot de passe"
        name="password_confirm"
        placeholder="Confirmez votre mot de passe"
      />

      <ButtonSubmit loadingText="authentification en cours...">
        S'inscrire
      </ButtonSubmit>
    </AppForm>
  );
};

export default FormSignUp;
