import { FastifyInstance } from "fastify";
import { AuthenticationModel } from "./authentication.model";
import bcrypt from "bcrypt";

export class AuthenticationService {
  private authenticationModel: AuthenticationModel;
  private fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.authenticationModel = new AuthenticationModel(fastify);
    this.fastify = fastify;
  }

  // Récupérer un utilisateur par Email
  async getUserByEmail(email: string) {
    try {
      const user = await this.authenticationModel.getUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      console.error("Error in getUserByEmail:", error);
      throw new Error("Unable to fetch user");
    }
  }

  // Récupérer un utilisateur par Email
  async generateJWTToken(
    password: string,
    user: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      active: boolean;
      id: string;
    }
  ) {
    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }
      // Générer un token JWT
      const token = this.fastify.jwt.sign(
        {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          active: user.active,
        },
        { expiresIn: "1h" }
      );
      return token;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in getUserByEmail:", error.message);
        throw error.message; // Conserve le contexte d'erreur
      } else {
        console.error("Unknown error in getUserByEmail:", error);
        throw new Error("An unknown error occurred");
      }
    }
  }
}
