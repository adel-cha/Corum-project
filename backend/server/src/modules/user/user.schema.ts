import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

// Schéma pour créer un utilisateur
export const createUserSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(255),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format, expected YYYY-MM-DD",
  }),
});

// Schéma pour récupérer un utilisateur par ID
export const getUserByIdSchema = z.object({
  id: z.string().uuid("Invalid user ID format"),
});

// Schéma pour mettre à jour un utilisateur
export const updateUserSchema = z.object({
  firstName: z.string().min(1).max(255).optional(),
  lastName: z.string().min(1).max(255).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  birthday: z.string().optional(),
});

// Schéma pour la réponse d'un utilisateur
export const userResponseSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  birthDate: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// Schéma pour récupérer tous les utilisateurs
export const usersResponseSchema = z.array(userResponseSchema);

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    createUserSchema,
    userResponseSchema,
    updateUserSchema,
    usersResponseSchema,
  },
  {
    $id: "UserSchema", // Identifiant unique pour les schémas
  }
);

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
