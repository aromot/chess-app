import { z } from "zod";

const msgEmailRequired = "L'e-mail est obligatoire.";
const msgEmailInvalid = "L'e-mail doit être valide.";
const msgPassRequired = "Le mot de passe est obligatoire.";
const msgPassLength = "Le mot de passe doit contenir 6 à 32 caractères.";
const msgPassConfirmRequired =
  "La confirmation de mot de passe est obligatoire.";
const msgOldPassRequired = "Le mot de passe est obligatoire.";
const msgNewPassRequired = "Le nouveau mot de passe est obligatoire.";
const msgNewPassConfirmRequired = "La confirmation du nouveau mot de passe est obligatoire.";
const msgNewPassLength = "Le nouveau mot de passe doit contenir 6 à 32 caractères.";

export const signInSchema = z.object({
  email: z
    .string({ required_error: msgEmailRequired })
    .min(1, msgEmailRequired)
    .email(msgEmailInvalid),
  password: z
    .string({ required_error: msgPassRequired })
    .min(1, msgPassRequired)
    .min(6, msgPassLength)
    .max(32, msgPassLength),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  email: z
    .string({ required_error: msgEmailRequired })
    .min(1, msgEmailRequired)
    .email(msgEmailInvalid),
  password: z
    .string({ required_error: msgPassRequired })
    .min(1, msgPassRequired)
    .min(6, msgPassLength)
    .max(32, msgPassLength),
  password_confirm: z
    .string({ required_error: msgPassConfirmRequired })
    .min(1, msgPassConfirmRequired)
    .min(6, msgPassLength)
    .max(32, msgPassLength),
});
export type SignUpFormValues = z.infer<typeof signUpSchema>;

export const changePasswordSchema = z.object({
  old_password: z
    .string({ required_error: msgOldPassRequired })
    .min(1, msgOldPassRequired),
  new_password: z
    .string({ required_error: msgNewPassRequired })
    .min(1, msgNewPassRequired)
    .min(6, msgNewPassLength)
    .max(32, msgNewPassLength),
  new_password_confirm: z
    .string()
    .min(1, msgNewPassConfirmRequired)
    .min(6, msgNewPassLength)
    .max(32, msgNewPassLength),
})
.refine((data) => data.new_password === data.new_password_confirm, { message: msgNewPassConfirmRequired, path: ['new_password_confirm'] });
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

