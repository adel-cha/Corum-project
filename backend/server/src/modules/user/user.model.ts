import { FastifyInstance } from "fastify";
import { CreateUserInput, UpdateUserInput } from "./user.schema";
import { Prisma } from "@prisma/client";
const userResponse = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  birthDate: true,
  createdAt: true,
  updatedAt: true,
  active: true,
};
// Modèle pour les interactions avec la base de données
export class UserModel {
  private fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  // Créer un utilisateur
  async createUser(
    data: CreateUserInput & {
      password: string;
    }
  ) {
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
  async getAllUsers(
    filters: { [key: string]: string | number | Date | undefined },
    offset: number,
    limit: number
  ) {
    // Appliquer les filtres
    const where: Prisma.UserWhereInput = {};

    const validKeys = [
      "firstName",
      "lastName",
      "email",
      "birthDate",
      "createdAt",
      "updatedAt",
    ];
    for (const key of Object.keys(filters)) {
      if (validKeys.includes(key) && key) {
        if (key === "birthDate") {
          const parsedDate = new Date(filters[key] as string);
          if (!isNaN(parsedDate.getTime())) {
            // Convertir la date en ISO-8601
            const isoDate = parsedDate.toISOString();
            where[key as keyof Prisma.UserWhereInput] = {
              equals: isoDate,
            } as any;
          }
        } else {
          where[key as keyof Prisma.UserWhereInput] = {
            contains: filters[key],
            mode: "insensitive",
          } as any;
        }
      }
    }
    return await this.fastify.prisma.$transaction([
      this.fastify.prisma.user.findMany({
        where,
        skip: offset,
        take: limit,
        select: userResponse,
      }),
      this.fastify.prisma.user.count({ where }),
    ]);
  }

  // Mettre à jour un utilisateur
  async updateUser(id: string, data: UpdateUserInput) {
    console.log("data", data);
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
