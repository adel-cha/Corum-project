import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

// Schéma pour l'authentification
export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export const { schemas: authenticationSchemas, $ref } = buildJsonSchemas(
  {
    LoginSchema,
  },
  {
    $id: "authenticationSchemas", // Identifiant unique pour les schémas
  }
);
export type LoginInput = z.infer<typeof LoginSchema>;
