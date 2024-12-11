import { describe, it, expect, vi, beforeEach } from "vitest";
import { FastifyInstance } from "fastify";
import { UserModel } from "../user.model"; // Assurez-vous d'importer la bonne classe

// Mock de l'instance Prisma
const mockPrisma = {
  user: {
    create: vi.fn(),
    findUnique: vi.fn(),
    findMany: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
  },
  $transaction: vi.fn(),
};

// Mock du serveur Fastify
const mockFastify = {
  prisma: mockPrisma,
} as unknown as FastifyInstance;

describe("UserModel", () => {
  let userModel: UserModel;

  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    vi.resetAllMocks();
    userModel = new UserModel(mockFastify);
  });

  it("should create a user", async () => {
    const userInput = {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      birthDate: "1995-02-20",
      password: "password123",
    };

    const mockResponse = {
      id: "1",
      ...userInput,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockPrisma.user.create.mockResolvedValueOnce(mockResponse);

    const result = await userModel.createUser(userInput);

    expect(mockPrisma.user.create).toHaveBeenCalledWith({
      data: userInput,
      select: expect.any(Object),
    });
    expect(result).toEqual(mockResponse);
  });

  it("should get a user by ID", async () => {
    const mockUser = {
      id: "1",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      birthDate: "1995-02-20",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockPrisma.user.findUnique.mockResolvedValueOnce(mockUser);

    const result = await userModel.getUserById("1");

    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: "1" },
      select: expect.any(Object),
    });
    expect(result).toEqual(mockUser);
  });

  it("should get all users", async () => {
    const filters = { firstName: "Jane" };
    const mockUsers = [
      {
        id: "1",
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        birthDate: "1995-02-20",
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "2",
        firstName: "Jone",
        lastName: "Doe",
        email: "Jone.doe@example.com",
        birthDate: "1995-01-10",
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    const count = 2;

    mockPrisma.user.findMany.mockResolvedValueOnce(mockUsers);
    mockPrisma.user.count.mockResolvedValueOnce(count);

    const { data, total } = await userModel.getAllUsers(
      filters,
      0,
      10,
      "firstName",
      "asc"
    );

    expect(mockPrisma.user.findMany).toHaveBeenCalledWith({
      where: expect.any(Object),
      skip: 0,
      take: 10,
      select: expect.any(Object),
      orderBy: { firstName: "asc" },
    });
    expect(mockPrisma.user.count).toHaveBeenCalledWith({
      where: expect.any(Object),
    });
    expect(data).toEqual(mockUsers);
    expect(total).toBe(count);
  });

  it("should update a user", async () => {
    const userUpdate = { firstName: "Janet" };
    const mockUpdatedUser = {
      id: "1",
      ...userUpdate,
      lastName: "Doe",
      email: "jane.doe@example.com",
      birthDate: "1995-02-20",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockPrisma.user.update.mockResolvedValueOnce(mockUpdatedUser);

    const result = await userModel.updateUser("1", userUpdate);

    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: { id: "1" },
      data: userUpdate,
      select: expect.any(Object),
    });
    expect(result).toEqual(mockUpdatedUser);
  });

  it("should delete a user", async () => {
    const mockDeletedUser = {
      id: "1",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      birthDate: "1995-02-20",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockPrisma.user.delete.mockResolvedValueOnce(mockDeletedUser);

    const result = await userModel.deleteUser("1");

    expect(mockPrisma.user.delete).toHaveBeenCalledWith({
      where: { id: "1" },
    });
    expect(result).toEqual(mockDeletedUser);
  });
});
