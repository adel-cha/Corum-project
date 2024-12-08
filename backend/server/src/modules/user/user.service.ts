import { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import { UserModel } from "./user.model";
import { CreateUserInput, UpdateUserInput } from "./user.schema";

export class UserService {
  private userModel: UserModel;

  constructor(fastify: FastifyInstance) {
    this.userModel = new UserModel(fastify);
  }
  // Générer un hash pour le mot de passe
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
  // Créer un utilisateur
  async createUser(data: CreateUserInput) {
    try {
      const { birthDate, ...rest } = data;

      const hashedPassword = await this.hashPassword(data.password);

      const formattedBirthday = new Date(birthDate);
      const newUser = await this.userModel.createUser({
        ...rest,
        birthDate: formattedBirthday.toISOString(),
        password: hashedPassword,
      });
      return newUser;
    } catch (error) {
      console.error("Error in createUser:", error);
      throw new Error("Unable to create user");
    }
  }

  // Récupérer un utilisateur par ID
  async getUserById(id: string) {
    try {
      const user = await this.userModel.getUserById(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      console.error("Error in getUserById:", error);
      throw new Error("Unable to fetch user");
    }
  }

  // Récupérer tous les utilisateurs
  async getAllUsers(
    page: number = 1,
    limit: number = 10,
    filters: { [key: string]: string | number | Date | undefined } = {}
  ) {
    try {
      const offset = (page - 1) * limit;

      const [data, total] = await this.userModel.getAllUsers(
        filters,
        offset,
        limit
      );

      const totalPages = Math.ceil(total / limit);

      return {
        data,
        total,
        page,
        totalPages,
      };
    } catch (error) {
      console.error("Error in getUsers:", error);
      throw new Error("Unable to fetch users");
    }
  }

  // Mettre à jour un utilisateur
  async updateUser(id: string, data: UpdateUserInput) {
    try {
      if (data.password) {
        data.password = await this.hashPassword(data.password);
      }
      const updatedUser = await this.userModel.updateUser(id, data);
      return updatedUser;
    } catch (error) {
      console.error("Error in updateUser:", error);
      throw new Error("Unable to update user");
    }
  }

  // Supprimer un utilisateur
  async deleteUser(id: string) {
    try {
      const deletedUser = await this.userModel.deleteUser(id);
      return deletedUser;
    } catch (error) {
      console.error("Error in deleteUser:", error);
      throw new Error("Unable to delete user");
    }
  }
}
