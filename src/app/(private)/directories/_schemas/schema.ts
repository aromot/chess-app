import { z } from "zod";

export const DirectorySchema = z.object({
  name: z.string().min(1, "Le nom est requis."),
  white: z.boolean(),
  fenPosInit: z.string().min(1, "La position de départ est requise."),
});

export type DirectoryFormValues = z.infer<typeof DirectorySchema>;
