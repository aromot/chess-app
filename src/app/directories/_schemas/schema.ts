import { z } from "zod";

export const DirectorySchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  white: z.boolean(),
});

export type DirectoryFormValues = z.infer<typeof DirectorySchema>;
