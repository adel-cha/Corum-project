import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaPlugin = fp(async (fastify) => {
  const prisma = new PrismaClient();

  // Nettoyer les connexions à la base de données lorsque le serveur se ferme
  fastify.addHook("onClose", async (app) => {
    await prisma.$disconnect();
  });

  // Ajouter Prisma comme instance accessible via fastify.prisma
  fastify.decorate("prisma", prisma);
});

export default prismaPlugin;
