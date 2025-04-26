"use client";

import { useAppForm } from "@/components/forms/useAppForm";
import AppForm from "@/components/forms/AppForm";
import EmailInput from "@/components/forms/EmailInput";
import PasswordInput from "@/components/forms/PasswordInput";
import ButtonSubmit from "@/components/forms/ButtonSubmit";
// import { dbg } from "@/lib/helpers";
import FormGeneralError from "@/components/forms/FormGeneralError";
import { ZodIssue } from "zod";
import { URLS } from "@/app/urls";
import { SignInFormValues, signInSchema } from "../../_schemas/schema";
import { signInAction } from "../../_actions/actions";

const FormCredentialsSignIn = () => {
  const form = useAppForm({
    schema: signInSchema,
    defaultValues: {
      email: "aromot@gmail.com",
      password: "azertyuiop",
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    // dbg.info({ ...values });

    const res = await signInAction(values);
    if (res?.error == "validation") {
      res.errors.forEach((err: ZodIssue) => {
        err.path.forEach((path) => {
          form.setError(path, {
            type: "manual",
            message: err.message,
          });
        });
      });
    } else if (res?.error === "general") {
      form.setError("root", {
        message:
          res.message ||
          "Une erreur s'est produite, essayez à nouveau plus tard.", //error.message,
      });
    }

    window.location.href = URLS.dashboard;
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

      <ButtonSubmit loadingText="authentification en cours...">
        S'authentifier
      </ButtonSubmit>
    </AppForm>
  );
};

export default FormCredentialsSignIn;
