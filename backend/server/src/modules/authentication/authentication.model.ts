import { FastifyInstance } from "fastify";

export class AuthenticationModel {
  private fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  // Récupérer un utilisateur par ID
  async getUserByEmail(email: string) {
    return this.fastify.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
  }
}
