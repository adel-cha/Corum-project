import { FastifyInstance } from "fastify";
import * as authenticationController from "./authentication.contoller";

const authenticationRoutes = (fastify: FastifyInstance) => {
  // Initialiser le contrôleur
  authenticationController.initAuthenticationController(fastify);

  // Définir les routes
  fastify.post("/login", authenticationController.loginHandler);
};

export default authenticationRoutes;
