import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaPlugin = fp(async (fastify) => {
  const prisma = new PrismaClient();
  const admin = await prisma.user.findUnique({
    where: { email: "admin@corum.com" },
    select: { email: true },
  });
  console.log(admin === null);
  if (admin === null) {
    console.log("in");
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync("corum123", salt);
    prisma.user.create({
      data: {
        firstName: "admin",
        lastName: "admin",
        email: "admin@corum.com",
        birthDate: new Date("1995-02-20"),
        password: hashedPassword,
        active: false,
      },
    });
  }
  // Nettoyer les connexions à la base de données lorsque le serveur se ferme
  fastify.addHook("onClose", async (app) => {
    await prisma.$disconnect();
  });

  // Ajouter Prisma comme instance accessible via fastify.prisma
  fastify.decorate("prisma", prisma);
});

export default prismaPlugin;
