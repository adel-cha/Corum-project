import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterAll,
  beforeEach,
} from "vitest";
import Fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify"; // Import de Fastify et FastifyInstance
import userRoutes from "../user.routes";
import { userService } from "../user.controller";
import { UserService } from "../user.service";
import { faker } from "@faker-js/faker";
// Mock du UserService et autres dépendances
vi.mock("../user.service");
vi.mock("../../../plugins/swagger");
describe("User Routes", () => {
  let fastify: FastifyInstance; // Typage explicite de fastify
  let mockUserService: UserService;
  const createdAt = faker.date.recent();
  // Initialiser une seule fois avant tous les tests
  beforeAll(async () => {
    fastify = Fastify(); // Créer une instance Fastify
    fastify.register(userRoutes); // Enregistrer les routes dans Fastify
    fastify.decorate(
      "authenticate",
      vi
        .fn()
        .mockImplementation(
          (request: FastifyRequest, reply: FastifyReply, done: Function) =>
            done()
        )
    );
    mockUserService = vi.mocked(new UserService(fastify));
    fastify.decorate("userService", mockUserService);
    await fastify.ready(); // Attendre que Fastify soit prêt
  });

  // Fermer le serveur après tous les tests
  afterAll(async () => {
    await fastify.close();
  });

  // Initialiser les mocks avant chaque test
  beforeEach(() => {
    mockUserService = userService;

    vi.clearAllMocks(); // Réinitialiser les mocks avant chaque test
  });
  const newUser = {
    id: "123",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    birthDate: new Date("1990-01-01"),
    active: true,
    createdAt: createdAt,
    updatedAt: createdAt,
  };
  describe("POST /", () => {
    it("should create a user and return status 201", async () => {
      // Mock de la méthode createUser
      const mockeCreatUser = vi.mocked(mockUserService.createUser);
      mockeCreatUser.mockResolvedValue(newUser);

      const response = await fastify.inject({
        method: "POST",
        url: "/",
        payload: {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          birthDate: "1990-01-01",
        },
        headers: {
          Authorization: "Bearer token", // Si nécessaire
        },
      });
      const userResponse = {
        ...newUser,
        birthDate: newUser.birthDate.toISOString(),
        createdAt: createdAt.toISOString(),
        updatedAt: createdAt.toISOString(),
      };
      expect(response.statusCode).toBe(201);
      expect(response.json()).toEqual(userResponse);
      expect(mockUserService.createUser).toHaveBeenCalledOnce();
    });
  });

  describe("GET /:id", () => {
    it("should get a user by id", async () => {
      const user = {
        id: "123",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        active: true,
        birthDate: new Date("1990-01-01").toISOString(),
        createdAt: createdAt.toISOString(),
        updatedAt: createdAt.toISOString(),
      };
      const mockeGetUserById = vi.mocked(mockUserService.getUserById);
      mockeGetUserById.mockResolvedValue(newUser);

      const response = await fastify.inject({
        method: "GET",
        url: "/123", // Id du user
        headers: {
          Authorization: "Bearer token", // Si nécessaire
        },
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual(user);
      expect(mockUserService.getUserById).toHaveBeenCalledWith("123");
    });
  });

  describe("GET /", () => {
    it("should get all users", async () => {
      const users = [
        {
          id: "123",
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          active: true,
          birthDate: new Date("1990-01-01").toISOString(),
          createdAt: createdAt.toISOString(),
          updatedAt: createdAt.toISOString(),
        },
      ];
      const mockeGetAllUsers = vi.mocked(mockUserService.getAllUsers);
      mockeGetAllUsers.mockResolvedValue({
        data: [newUser],
        total: 1,
        page: 1,
        totalPages: 1,
      });

      const response = await fastify.inject({
        method: "GET",
        url: "/",
        headers: {
          Authorization: "Bearer token", // Si nécessaire
        },
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual({
        data: users,
        total: 1,
        page: 1,
        totalPages: 1,
      });
      expect(mockUserService.getAllUsers).toHaveBeenCalled();
    });
  });

  describe("PUT /:id", () => {
    it("should update a user by id", async () => {
      const updatedUser = {
        id: "123",
        firstName: "John",
        lastName: "Doe",
        active: true,
        email: "john.doe@example.com",
        birthDate: new Date("1990-01-01").toISOString(),
        createdAt: createdAt.toISOString(),
        updatedAt: createdAt.toISOString(),
      };
      const mockeUpdatedUser = vi.mocked(mockUserService.updateUser);
      mockeUpdatedUser.mockResolvedValue(newUser);

      const response = await fastify.inject({
        method: "PUT",
        url: "/123", // Id du user
        payload: {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          birthDate: "1990-01-01",
        },
        headers: {
          Authorization: "Bearer token", // Si nécessaire
        },
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual(updatedUser);
      expect(mockUserService.updateUser).toHaveBeenCalledWith(
        "123",
        expect.any(Object)
      );
    });
  });

  describe("DELETE /:id", () => {
    it("should delete a user by id", async () => {
      const deletedUser = { id: "123" };
      const mockeUpdatedUser = vi.mocked(mockUserService.deleteUser);
      const userToSend = {
        ...newUser,
        password: "",
      };
      mockeUpdatedUser.mockResolvedValue(userToSend);

      const response = await fastify.inject({
        method: "DELETE",
        url: "/123", // Id du user
        headers: {
          Authorization: "Bearer token", // Si nécessaire
        },
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual(deletedUser);
      expect(mockUserService.deleteUser).toHaveBeenCalledWith("123");
    });
  });
});
