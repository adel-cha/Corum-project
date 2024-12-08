import fp from "fastify-plugin";
import { FastifyReply, FastifyRequest } from "fastify";

// Plugin d'authentification
const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify(); // Vérifie le token JWT
  } catch (err) {
    reply.status(401).send({ error: "Unauthorized" }); // Renvoie une erreur 401 si le token est invalide
  }
};
const authenticationPlugin = fp(async (fastify) => {
  // Ajouter Prisma comme instance accessible via fastify.prisma
  fastify.decorate("authenticate", authenticate);
});

export default authenticationPlugin;
