import { describe, it, expect, vi, beforeEach } from "vitest";
import bcrypt from "bcryptjs";
import { FastifyInstance } from "fastify";
import { UserService } from "../user.service";
import { UserModel } from "../user.model";
import { faker } from "@faker-js/faker";
vi.mock("bcrypt");
vi.mock("./user.model");
const createdAt = faker.date.recent();
describe("UserService", () => {
  let userService: UserService;
  let mockFastify: FastifyInstance;

  beforeEach(() => {
    mockFastify = {} as FastifyInstance; // Crée une instance Fastify fictive
    userService = new UserService(mockFastify);
  });

  describe("hashPassword", () => {
    it("should return a hashed password", async () => {
      const password = "testpassword";
      const hashedPassword = "hashedpassword";
      vi.spyOn(bcrypt, "hash").mockImplementation(async () =>
        Promise.resolve(hashedPassword)
      );

      const result = await (userService as any).hashPassword(password);

      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(result).toBe(hashedPassword);
    });
  });

  describe("createUser", () => {
    it("should create a new user with hashed password", async () => {
      const mockData = {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        birthDate: new Date("1995-02-20"),
        active: true,
        createdAt: createdAt,
        updatedAt: createdAt,
      };
      const mockCreatedUser = { id: "123", ...mockData };
      vi.spyOn(UserModel.prototype, "createUser").mockResolvedValue(
        mockCreatedUser
      );
      vi.spyOn(userService as any, "hashPassword").mockResolvedValue(
        "hashedpassword"
      );
      const mockDataToCreate = {
        ...mockData,
        birthDate: mockData.birthDate.toISOString(),
      };
      const result = await userService.createUser(mockDataToCreate);

      expect(userService["hashPassword"]).toHaveBeenCalledWith("corum123");
      expect(UserModel.prototype.createUser).toHaveBeenCalledWith({
        active: true,
        birthDate: "1995-02-20T00:00:00.000Z",
        createdAt: createdAt,
        email: "jane.doe@example.com",
        firstName: "Jane",
        lastName: "Doe",
        password: "hashedpassword",
        updatedAt: createdAt,
      });
      expect(result).toEqual(mockCreatedUser);
    });

    it("should throw an error if user creation fails", async () => {
      const mockData = {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        birthDate: "1995-02-20",
      };
      vi.spyOn(UserModel.prototype, "createUser").mockRejectedValue(
        new Error("Database error")
      );

      await expect(userService.createUser(mockData)).rejects.toThrow(
        "Unable to create user"
      );
    });
  });

  describe("getUserById", () => {
    it("should return a user by ID", async () => {
      const mockUser = {
        id: "123",
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        birthDate: new Date("1995-02-20"),
        active: true,
        createdAt: createdAt,
        updatedAt: createdAt,
      };
      vi.spyOn(UserModel.prototype, "getUserById").mockResolvedValue(mockUser);

      const result = await userService.getUserById("123");

      expect(UserModel.prototype.getUserById).toHaveBeenCalledWith("123");
      expect(result).toEqual(mockUser);
    });

    it("should throw an error if user not found", async () => {
      vi.spyOn(UserModel.prototype, "getUserById").mockResolvedValue(null);

      await expect(userService.getUserById("123")).rejects.toThrow(
        "Unable to fetch user"
      );
    });
  });

  describe("updateUser", () => {
    it("should update a user and hash the password if provided", async () => {
      const mockData = { password: "newpassword" };
      const mockUpdatedUser = {
        id: "123",
        firstName: "updatedUser",
        lastName: "Doe",
        email: "jane.doe@example.com",
        birthDate: new Date("1995-02-20"),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      vi.spyOn(UserModel.prototype, "updateUser").mockResolvedValue(
        mockUpdatedUser
      );
      vi.spyOn(userService as any, "hashPassword").mockResolvedValue(
        "hashedpassword"
      );

      const result = await userService.updateUser("123", mockData);

      expect(userService["hashPassword"]).toHaveBeenCalledWith("newpassword");
      expect(UserModel.prototype.updateUser).toHaveBeenCalledWith("123", {
        password: "hashedpassword",
      });
      expect(result).toEqual(mockUpdatedUser);
    });

    it("should throw an error if update fails", async () => {
      const mockData = { firstName: "updatedUser" };
      vi.spyOn(UserModel.prototype, "updateUser").mockRejectedValue(
        new Error("Update failed")
      );

      await expect(userService.updateUser("123", mockData)).rejects.toThrow(
        "Unable to update user"
      );
    });
  });

  describe("deleteUser", () => {
    it("should delete a user by ID", async () => {
      const mockDeletedUser = {
        id: "123",
        firstName: "deletedUser",
        lastName: "Doe",
        email: "jane.doe@example.com",
        password: "test",
        birthDate: new Date("1995-02-20"),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      vi.spyOn(UserModel.prototype, "deleteUser").mockResolvedValue(
        mockDeletedUser
      );

      const result = await userService.deleteUser("123");

      expect(UserModel.prototype.deleteUser).toHaveBeenCalledWith("123");
      expect(result).toEqual(mockDeletedUser);
    });

    it("should throw an error if deletion fails", async () => {
      vi.spyOn(UserModel.prototype, "deleteUser").mockRejectedValue(
        new Error("Deletion failed")
      );

      await expect(userService.deleteUser("123")).rejects.toThrow(
        "Unable to delete user"
      );
    });
  });
});
