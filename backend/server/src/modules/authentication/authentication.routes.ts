import { FastifyInstance } from "fastify";
import {
  LoginSchema,
  authenticationSchemas,
  $ref,
} from "./authentication.schema";
import * as authenticationController from "./authentication.contoller";
import { validateSchema } from "#plugins/swagger";

const authenticationRoutes = (fastify: FastifyInstance) => {
  // Initialiser le contrôleur
  authenticationController.initAuthenticationController(fastify);

  for (const schema of authenticationSchemas) {
    fastify.addSchema(schema);
  }
  // Définir les routes
  fastify.post(
    "/login",
    {
      preValidation: validateSchema(LoginSchema),
      schema: {
        tags: ["Login"],
        summary: "Create a new user",
        description: "Create a new user",
        security: [{ BearerAuth: [] }], // JWT requis
        body: $ref("LoginSchema"),
        response: {
          201: {
            type: "object",
            properties: {
              token: {
                type: "string",
                description: "JWT token expire in 1 hour",
              },
            },
          },
        },
      },
    },
    authenticationController.loginHandler
  );
};

export default authenticationRoutes;
