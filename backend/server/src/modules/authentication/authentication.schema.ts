import { z } from "zod";

// Schéma pour l'authentification
export const LoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});
export type LoginInput = z.infer<typeof LoginSchema>;
