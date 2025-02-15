"use client";

import { useAppForm } from "@/components/forms/useAppForm";
import { SignInFormValues, signInSchema } from "../schema";
import AppForm from "@/components/forms/AppForm";
import EmailInput from "@/components/forms/EmailInput";
import PasswordInput from "@/components/forms/PasswordInput";
import ButtonSubmit from "@/components/forms/ButtonSubmit";
import { dbg } from "@/lib/helpers";
import { signIn } from "next-auth/react";

const FormSignIn = () => {
  const form = useAppForm({
    schema: signInSchema,
    defaultValues: {
      email: "aromot@gmail.com",
      password: "azertyuiop",
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    dbg.info({ ...values });

    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        // redirectTo: "/",
      });

      dbg.info(res);
    } catch (error) {
      dbg.error(error);
    }

    // if (onSuccess) {
    //   onSuccess();
    // }
  };

  return (
    <AppForm form={form} onSubmit={onSubmit} className="space-y-3">
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

      <ButtonSubmit loadingText="authentification en cours...">
        S'authentifier
      </ButtonSubmit>
    </AppForm>
  );
};

export default FormSignIn;
