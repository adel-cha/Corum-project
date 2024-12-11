import { describe, it, expect, vi, beforeEach } from "vitest";
import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { UserService } from "../user.service";
import {
  createUserHandler,
  initUserController,
  getUserByIdHandler,
  getAllUsersHandler,
  updateUserHandler,
  deleteUserHandler,
  userService,
} from "../user.controller";
import { CreateUserInput, UpdateUserInput } from "../user.schema";
import { faker } from "@faker-js/faker";

// Mock du UserService
vi.mock("../user.service");
const createdAt = faker.date.recent();
describe("UserController", () => {
  let mockUserService: UserService;
  let mockFastify: FastifyInstance;
  let mockReply: Partial<FastifyReply>;

  beforeEach(() => {
    // Mock de l'instance Fastify
    mockFastify = {} as FastifyInstance;

    // Initialiser le service avec initUserController
    initUserController(mockFastify);

    // Réinitialiser les mocks avant chaque test
    vi.clearAllMocks();

    // Mock de la réponse Fastify
    mockReply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };
  });

  describe("createUserHandler", () => {
    it("should create a user and return 201 status", async () => {
      const mockRequest = {
        body: {
          firstName: "test",
          email: "test@example.com",
          lastName: "user",
          birthDate: "1995-02-20",
        },
      } as FastifyRequest<{ Body: CreateUserInput }>;

      // Valeur simulée pour l'utilisateur créé
      const createdUser = {
        id: "123",
        firstName: "test",
        email: "test@example.com",
        lastName: "user",
        birthDate: new Date("1995-02-20"),
        active: true,
        createdAt: createdAt,
        updatedAt: createdAt,
      };

      // Mock de la méthode createUser
      vi.spyOn(userService, "createUser").mockResolvedValue(createdUser);

      // Appeler le handler
      await createUserHandler(mockRequest, mockReply as FastifyReply);

      // Vérification du statut 201
      expect(mockReply.status).toHaveBeenCalledWith(201);

      // Vérification que la méthode send a bien été appelée avec l'utilisateur créé
      expect(mockReply.send).toHaveBeenCalledWith(createdUser);
    });
  });

  describe("getUserByIdHandler", () => {
    it("should return a user by ID with 200 status", async () => {
      const mockRequest = {
        params: { id: "123" },
      } as FastifyRequest<{ Params: { id: string } }>;
      const mockReply = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
      } as unknown as FastifyReply;

      vi.spyOn(userService, "getUserById").mockResolvedValue({
        id: "123",
        firstName: "test",
        email: "test@example.com",
        lastName: "user",
        birthDate: new Date("1995-02-20"),
        active: true,
        createdAt: createdAt,
        updatedAt: createdAt,
      });
      const userResponse = {
        id: "123",
        firstName: "test",
        email: "test@example.com",
        lastName: "user",
        birthDate: new Date("1995-02-20"),
        active: true,
        createdAt: createdAt,
        updatedAt: createdAt,
      };

      await getUserByIdHandler(mockRequest, mockReply);

      expect(mockReply.status).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith(userResponse);
    });

    it("should handle not found user and return 404 status", async () => {
      const mockRequest = {
        params: { id: "123" },
      } as FastifyRequest<{ Params: { id: string } }>;
      const mockReply = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
      } as unknown as FastifyReply;

      vi.spyOn(userService, "getUserById").mockRejectedValue(
        new Error("User not found")
      );

      await getUserByIdHandler(mockRequest, mockReply);

      expect(mockReply.status).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({
        error: "User not found",
      });
    });
  });

  describe("getAllUsersHandler", () => {
    it("should return paginated users with 200 status", async () => {
      const mockRequest = {
        query: { page: "1", limit: "10" },
      } as FastifyRequest<{
        Querystring: {
          page?: string;
          limit?: string;
          sortBy?: string;
          sortOrder?: "asc" | "desc";
          [key: string]: string | number | Date | undefined;
        };
      }>;
      const mockReply = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
      } as unknown as FastifyReply;

      vi.spyOn(userService, "getAllUsers").mockResolvedValue({
        data: [
          {
            id: "123",
            firstName: "test",
            email: "",
            lastName: "user",
            active: false,
            birthDate: new Date("1995-02-20"),
            createdAt: createdAt,
            updatedAt: createdAt,
          },
        ],
        total: 1,
        page: 1,
        totalPages: 1,
      });

      await getAllUsersHandler(mockRequest, mockReply);

      expect(mockReply.status).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        data: [
          {
            id: "123",
            firstName: "test",
            lastName: "user",
            email: "",
            active: false,
            birthDate: new Date("1995-02-20"),
            createdAt: createdAt,
            updatedAt: createdAt,
          },
        ],
        total: 1,
        page: 1,
        totalPages: 1,
      });
    });

    it("should handle errors and return 500 status", async () => {
      const mockRequest = {
        query: { page: "1", limit: "10" },
      } as FastifyRequest<{
        Querystring: {
          page?: string;
          limit?: string;
          sortBy?: string;
          sortOrder?: "asc" | "desc";
          [key: string]: string | number | Date | undefined;
        };
      }>;
      const mockReply = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
      } as unknown as FastifyReply;

      vi.spyOn(userService, "getAllUsers").mockRejectedValue(
        new Error("Database error")
      );

      await getAllUsersHandler(mockRequest, mockReply);

      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        error: "Unable to fetch users",
      });
    });
  });

  describe("updateUserHandler", () => {
    it("should update a user and return 200 status", async () => {
      const mockRequest = {
        params: { id: "123" },
        body: { firstName: "updatedUser" },
      } as FastifyRequest<{ Params: { id: string }; Body: UpdateUserInput }>;
      const mockReply = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
      } as unknown as FastifyReply;

      vi.spyOn(userService, "updateUser").mockResolvedValue({
        id: "123",
        firstName: "updatedUser",
        lastName: "",
        email: "",
        active: false,
        birthDate: new Date("1995-02-20"),
        createdAt: createdAt,
        updatedAt: createdAt,
      });

      await updateUserHandler(mockRequest, mockReply);

      expect(mockReply.status).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        id: "123",
        firstName: "updatedUser",
        lastName: "",
        email: "",
        active: false,
        birthDate: new Date("1995-02-20"),
        createdAt: createdAt,
        updatedAt: createdAt,
      });
    });

    it("should handle errors and return 500 status", async () => {
      const mockRequest = {
        params: { id: "123" },
        body: { firstName: "updatedUser" },
      } as FastifyRequest<{ Params: { id: string }; Body: UpdateUserInput }>;
      const mockReply = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
      } as unknown as FastifyReply;

      vi.spyOn(userService, "updateUser").mockRejectedValue(
        new Error("Update failed")
      );

      await updateUserHandler(mockRequest, mockReply);

      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        error: "Unable to update user",
      });
    });
  });

  describe("deleteUserHandler", () => {
    it("should delete a user and return 200 status", async () => {
      const mockRequest = {
        params: { id: "123" },
      } as FastifyRequest<{ Params: { id: string } }>;
      const mockReply = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
      } as unknown as FastifyReply;

      vi.spyOn(userService, "deleteUser").mockResolvedValue({
        id: "123",
        firstName: "deletedUser",
        lastName: "",
        email: "",
        password: "",
        active: false,
        birthDate: new Date("1995-02-20"),
        createdAt: createdAt,
        updatedAt: createdAt,
      });

      await deleteUserHandler(mockRequest, mockReply);

      expect(mockReply.status).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        id: "123",
        firstName: "deletedUser",
        lastName: "",
        email: "",
        password: "",
        active: false,
        birthDate: new Date("1995-02-20"),
        createdAt: createdAt,
        updatedAt: createdAt,
      });
    });

    it("should handle errors and return 500 status", async () => {
      const mockRequest = {
        params: { id: "123" },
      } as FastifyRequest<{ Params: { id: string } }>;
      const mockReply = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
      } as unknown as FastifyReply;

      vi.spyOn(userService, "deleteUser").mockRejectedValue(
        new Error("Deletion failed")
      );

      await deleteUserHandler(mockRequest, mockReply);

      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({
        error: "Unable to delete user",
      });
    });
  });
});
