import { FastifyInstance } from "fastify";
import { CreateUserInput, UpdateUserInput } from "./user.schema";
const userResponse = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  birthDate: true,
  createdAt: true,
  updatedAt: true,
};
// Modèle pour les interactions avec la base de données
export class UserModel {
  private fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  // Créer un utilisateur
  async createUser(data: CreateUserInput) {
    return this.fastify.prisma.user.create({
      data,
      select: userResponse,
    });
  }

  // Récupérer un utilisateur par ID
  async getUserById(id: string) {
    return this.fastify.prisma.user.findUnique({
      where: { id },
      select: userResponse,
    });
  }

  // Récupérer tous les utilisateurs
  async getAllUsers() {
    return this.fastify.prisma.user.findMany({
      select: userResponse,
    });
  }

  // Mettre à jour un utilisateur
  async updateUser(id: string, data: UpdateUserInput) {
    return this.fastify.prisma.user.update({
      where: { id },
      data,
      select: userResponse,
    });
  }

  // Supprimer un utilisateur
  async deleteUser(id: string) {
    return this.fastify.prisma.user.delete({
      where: { id },
    });
  }
}
