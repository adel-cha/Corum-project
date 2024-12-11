import { FastifyInstance } from "fastify";
import * as userController from "./user.controller";
import { validateSchema } from "../../plugins/swagger";
import { $ref } from "./user.schema";
import {
  createUserSchema,
  getUserByIdSchema,
  updateUserSchema,
  userSchemas,
} from "./user.schema";

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
  for (const schema of userSchemas) {
    fastify.addSchema(schema);
  }
  // Définir les routes
  fastify.post(
    "/",
    {
      preValidation: validateSchema(createUserSchema),
      schema: {
        tags: ["User"],
        summary: "Create a new user",
        description: "Create a new user",
        security: [{ BearerAuth: [] }], // JWT requis
        body: $ref("createUserSchema"),
        response: {
          201: $ref("userResponseSchema"),
        },
      },
    },
    createUserHandler
  );
  fastify.get(
    "/:id",
    {
      preValidation: validateSchema(getUserByIdSchema),
      schema: {
        tags: ["User"],
        description: "Get a user by ID (protected route)",
        security: [{ BearerAuth: [] }], // JWT requis
        response: {
          200: $ref("userResponseSchema"),
        },
      },
    },
    getUserByIdHandler
  );
  fastify.get(
    "/",
    {
      schema: {
        tags: ["User"],
        description: "Get all users ",
        security: [{ BearerAuth: [] }], // JWT requis
        querystring: {
          type: "object",
          properties: {
            page: { type: "string", description: "Page number" },
            limit: { type: "string", description: "Number of items per page" },
            firstName: {
              type: "string",
              description: "Filter by firstName (partial match)",
            },
            LastName: {
              type: "string",
              description: "Filter by LastName (partial match)",
            },
            birthDate: {
              type: "string",
              description: "Filter by birthDate (partial match)",
            },
            createdAt: {
              type: "string",
              description: "Filter by birthDate (partial match)",
            },
            updatedAt: {
              type: "string",
              description: "Filter by birthDate (partial match)",
            },
            email: {
              type: "string",
              description: "Filter by email (partial match)",
            },
          },
          additionalProperties: true, // Permettre d'autres attributs dynamiques
        },
        response: {
          200: {
            type: "object",
            properties: {
              data: { type: "array", items: $ref("userResponseSchema") },
              total: { type: "number", description: "Total number of users" },
              page: { type: "number", description: "Current page" },
              totalPages: {
                type: "number",
                description: "Total number of pages",
              },
            },
          },
        },
      },
    },
    getAllUsersHandler
  );
  fastify.put(
    "/:id",
    {
      preValidation: validateSchema(updateUserSchema),
      schema: {
        tags: ["User"],
        description: "Update a user by ID (protected route)",
        security: [{ BearerAuth: [] }], // JWT requis
        params: {
          type: "object",
          properties: {
            id: { type: "string", description: "User ID" },
          },
          required: ["id"],
        },
        body: $ref("updateUserSchema"),
        response: {
          200: $ref("userResponseSchema"),
        },
      },
    },
    updateUserHandler
  );
  fastify.delete(
    "/:id",
    {
      preValidation: validateSchema(getUserByIdSchema),
      schema: {
        tags: ["User"],
        description: "Delete a user by ID (protected route)",
        security: [{ BearerAuth: [] }], // JWT requis

        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "string", description: "ID of the deleted user" },
              message: { type: "string", description: "Confirmation message" },
            },
          },
        },
      },
    },
    deleteUserHandler
  );
};
export default userRoutes;
