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
import { changePassword } from "@/app/(auth)/_actions/actions";
import { zodResolver } from "@hookform/resolvers/zod";

// Définir les props attendues par le composant
interface FormChangePasswordProps {
  onSuccess: () => void; // Callback pour gérer la fermeture du dialogue
}

export function FormChangePassword({ onSuccess }: FormChangePasswordProps) {
  const form = useAppForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      new_password_confirm: "",
    },
  });

  const onSubmit = async (data: ChangePasswordFormValues) => {
    try {
      const result = await changePassword(
        data.old_password,
        data.new_password,
        data.new_password_confirm
      );
      
      if (result?.error) {
        throw new Error(result.error);
      }

      form.reset();
      onSuccess();
    } catch (error: any) {
      console.error("Erreur lors du changement de mot de passe :", error);
      
      // Gestion des erreurs spécifiques
      if (error.message.includes("ancien mot de passe incorrect")) {
        form.setError("old_password", {
          type: "manual",
          message: "Mot de passe actuel incorrect",
        });
      } else {
        form.setError("root", {
          type: "manual",
          message: error.message || "Une erreur est survenue lors du changement de mot de passe",
        });
      }
    }
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
              hasError={form.formState.errors.old_password}
            />
            <FormLabel>Nouveau mot de passe</FormLabel>
            <FormInput
              type="password"
              name="new_password"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              hasError={form.formState.errors.new_password}
            />
            <FormLabel>Confirmation du nouveau mot de passe</FormLabel>
            <FormInput
              type="password"
              name="new_password_confirm"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              hasError={form.formState.errors.new_password_confirm}
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
