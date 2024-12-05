import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { UserService } from "./user.service";
import { CreateUserInput, UpdateUserInput } from "./user.schema";

let userService: UserService;

// Initialiser le service utilisateur
export const initUserController = (fastify: FastifyInstance) => {
  userService = new UserService(fastify);
};

// Handler pour créer un utilisateur
export const createUserHandler = async (
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) => {
  try {
    const newUser = await userService.createUser(request.body);
    reply.status(201).send(newUser);
  } catch (error) {
    console.error("Error in createUserHandler:", error);
    reply.status(500).send({ error: "Unable to create user" });
  }
};

// Handler pour récupérer un utilisateur par ID
export const getUserByIdHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const user = await userService.getUserById(request.params.id);
    reply.status(200).send(user);
  } catch (error) {
    console.error("Error in getUserByIdHandler:", error);
    reply.status(404).send({ error: "User not found" });
  }
};

// Handler pour récupérer tous les utilisateurs
export const getAllUsersHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const users = await userService.getAllUsers();
    reply.status(200).send(users);
  } catch (error) {
    console.error("Error in getAllUsersHandler:", error);
    reply.status(500).send({ error: "Unable to fetch users" });
  }
};

// Handler pour mettre à jour un utilisateur
export const updateUserHandler = async (
  request: FastifyRequest<{ Params: { id: string }; Body: UpdateUserInput }>,
  reply: FastifyReply
) => {
  try {
    const updatedUser = await userService.updateUser(
      request.params.id,
      request.body
    );
    reply.status(200).send(updatedUser);
  } catch (error) {
    console.error("Error in updateUserHandler:", error);
    reply.status(500).send({ error: "Unable to update user" });
  }
};

// Handler pour supprimer
export const deleteUserHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const deletedUser = await userService.deleteUser(request.params.id);
    reply.status(200).send(deletedUser);
  } catch (error) {
    console.error("Error in deleteUserHandler:", error);
    reply.status(500).send({ error: "Unable to delete user" });
  }
};