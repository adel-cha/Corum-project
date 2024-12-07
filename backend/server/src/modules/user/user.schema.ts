import { z } from "zod";

// Schéma pour créer un utilisateur
export const createUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  birthDate: z.string(),
});

// Schéma pour récupérer un utilisateur par ID
export const getUserByIdSchema = z.object({
  id: z.string(),
});

// Schéma pour mettre à jour un utilisateur
export const updateUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  birthDate: z.string().optional(),
});

// Schéma pour récupérer tous les utilisateurs
export const getAllUsersSchema = z.object({
  response: z.array(
    z.object({
      id: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      birthDate: z.string(),
    })
  ),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
