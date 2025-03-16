import { z } from "zod";

export const CommentSchema = z.object({
  positionId: z.number(),
  content: z
    .string()
    .min(2, "Votre message doit contenir au moins 2 caractères."),
});

export type CommentFormValues = z.infer<typeof CommentSchema>;
