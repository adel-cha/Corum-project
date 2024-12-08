import fp from "fastify-plugin";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { ZodError } from "zod";

export const validateSchema = (schema: any) => {
  return async (request: any, reply: any) => {
    try {
      await schema.parseAsync(request.body || request.params);
    } catch (error) {
      if (error instanceof ZodError) {
        reply.status(400).send({ errors: error.errors });
      } else {
        reply.send(error);
      }
    }
  };
};

const swaggerPlugin = fp(async (fastify) => {
  // Configuration de Swagger
  fastify.register(fastifySwagger, {
    swagger: {
      info: {
        title: "Fastify API",
        description: "API documentation",
        version: "1.0.0",
      },

      tags: [
        { name: "Login", description: "Login related endpoints" },
        { name: "User", description: "User related endpoints" },
      ],
      securityDefinitions: {
        BearerAuth: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description: "JWT token in the format: Bearer <token>",
        },
      },
    },
  });

  // Configuration de Swagger UI
  fastify.register(fastifySwaggerUi, {
    routePrefix: "/docs", // URL de Swagger UI
    uiConfig: {
      docExpansion: "full", // Développer toutes les sections par défaut
      deepLinking: false,
    },
    staticCSP: true,
  });
});

export default swaggerPlugin;
