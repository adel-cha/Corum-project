import { FastifyInstance } from "fastify";
import {
  initUserController,
  createUserHandler,
  getUserByIdHandler,
  getAllUsersHandler,
  updateUserHandler,
  deleteUserHandler,
} from "./user.controller";

export default async function userRoutes(fastify: FastifyInstance) {
  // Initialiser le contrôleur
  initUserController(fastify);

  // Définir les routes
  fastify.post("/", createUserHandler);
  fastify.get("/:id", getUserByIdHandler);
  fastify.get("/", getAllUsersHandler);
  fastify.put("/:id", updateUserHandler);
  fastify.delete("/:id", deleteUserHandler);
}
