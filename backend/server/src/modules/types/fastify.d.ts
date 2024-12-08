import "fastify";
import type { FastifyZod } from "fastify-zod";
declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
    readonly zod: FastifyZod<typeof models>;
  }
}
