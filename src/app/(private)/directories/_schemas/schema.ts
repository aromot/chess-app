import { z } from "zod";

export const DirectorySchema = z.object({
  name: z.string().min(1, "The name is required."),
  white: z.boolean(),
  fenPosInit: z.string().min(1, "The starting position is required."),
  userId: z.string().min(1, "A user is required."),
});

export type DirectoryFormValues = z.infer<typeof DirectorySchema>;
