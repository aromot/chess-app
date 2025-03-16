"use client";

import { changePasswordSchema, ChangePasswordFormValues } from "@/app/(auth)/_schemas/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useAppForm } from "@/components/forms/useAppForm";
import AppForm from "@/components/forms/AppForm";
import FormInput from "@/components/forms/FormInput";
import ButtonSubmit from "@/components/forms/ButtonSubmit";
import { changePassword } from "../../_actions/actions";

// Définir les props attendues par le composant
interface FormChangePasswordProps {
  onSuccess: () => void; // Callback pour gérer la fermeture du dialogue
}

export function FormChangePassword({ onSuccess }: FormChangePasswordProps) {
  const form = useAppForm({
    schema: changePasswordSchema,
    defaultValues: {
      password: "",
      password_confirm: "",
    },
  });
  const onSubmit = async (data: ChangePasswordFormValues) => {
    await changePassword(data.password, data.password_confirm);
    onSuccess(); // Fermer le dialogue après un ajout réussi
  };

  return (
    <AppForm form={form} onSubmit={onSubmit} className="space-y-4">
      <FormField
        control={form.control}
        name="old_password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mot de passe actuel</FormLabel>
            <FormInput
              type="password"
              name="old_password"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
            <FormLabel>Nouveau mot de passe</FormLabel>
            <FormInput
              type="password"
              name="new_password"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
            <FormLabel>Confirmation du mot de passe</FormLabel>
            <FormInput
              type="password"
              name="new_password_confirm"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <ButtonSubmit loadingText="Changement en cours..." className="mt-4">
        Changer
      </ButtonSubmit>
    </AppForm>
  );
}
