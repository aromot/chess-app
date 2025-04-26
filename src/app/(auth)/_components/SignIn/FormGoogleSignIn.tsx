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
import { signInAction, signInGoogleAction } from "../../_actions/actions";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

const FormGoogleSignIn = () => {
  const params = useParams();
  // const form = useAppForm({
  //   schema: signInSchema,
  //   defaultValues: {
  //   },
  // });

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

  console.log({ params });

  return (
    <form action={signInGoogleAction}>
      <div className="text-center">
        <Button variant="secondary" type="submit">
          S'authentifier avec Google
        </Button>
      </div>
    </form>
  );
};

export default FormGoogleSignIn;
