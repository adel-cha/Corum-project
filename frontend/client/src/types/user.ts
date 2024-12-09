import { z } from 'zod';

// Schéma pour un utilisateur
export const UserSchema = z.object({
  id: z.string().uuid(), // UUID pour l'identifiant
  firstName: z.string().min(1), // Prénom non vide
  lastName: z.string().min(1), // Nom non vide
  email: z.string().email(), // Email valide*
  active: z.boolean().optional(),
  birthDate: z
    .string()
    .transform((date) => new Date(date))
    .optional(), // Convertir en objet Date
  createdAt: z.string().transform((date) => new Date(date)), // Date de création
  updatedAt: z.string().transform((date) => new Date(date)), // Date de mise à jour
});
export const UserFilterSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  birthdate: z.string().optional(), // Changez cela si vous utilisez un format de date spécifique
});

// Schéma pour la réponse des utilisateurs
export const UsersResponseSchema = z.object({
  data: z.array(UserSchema), // Tableau d'utilisateurs
  total: z.number(), // Nombre total d'utilisateurs
  page: z.number(), // Numéro de la page actuelle
  totalPages: z.number(), // Nombre total de pages
});

// Type inféré
export type User = z.infer<typeof UserSchema>;
export type UsersResponse = z.infer<typeof UsersResponseSchema>;
export type UserFilter = z.infer<typeof UserFilterSchema>;
