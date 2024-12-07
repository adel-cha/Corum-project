import { FastifyInstance } from "fastify";
import * as userController from "./user.controller";

const userRoutes = (fastify: FastifyInstance) => {
  const {
    initUserController,
    createUserHandler,
    getUserByIdHandler,
    getAllUsersHandler,
    updateUserHandler,
    deleteUserHandler,
  } = userController;

  // Initialiser le contrôleur
  initUserController(fastify);

  fastify.addHook("preValidation", fastify.authenticate);
  // Définir les routes
  fastify.post("/", createUserHandler);
  fastify.get("/:id", getUserByIdHandler);
  fastify.get("/", getAllUsersHandler);
  fastify.put("/:id", updateUserHandler);
  fastify.delete("/:id", deleteUserHandler);
};
export default userRoutes;
