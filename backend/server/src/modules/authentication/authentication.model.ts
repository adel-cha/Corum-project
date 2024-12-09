import { FastifyInstance } from "fastify";
const userResponse = {
  id: true,
  email: true,
  firstName: true,
  active: true,
  lastName: true,
  password: true,
};
export class AuthenticationModel {
  private fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  // Récupérer un utilisateur par ID
  async getUserByEmail(email: string) {
    return this.fastify.prisma.user.findUnique({
      where: { email },
      select: userResponse,
    });
  }
}
