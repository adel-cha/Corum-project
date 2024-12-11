import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { AuthenticationService } from "./authentication.service";
import { LoginInput } from "./authentication.schema";

let authenticationService: AuthenticationService;

// Initialiser le service authentication
export const initAuthenticationController = (fastify: FastifyInstance) => {
  authenticationService = new AuthenticationService(fastify);
};

// Handler pour l'authentification
export const loginHandler = async (
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply
) => {
  try {
    const user = await authenticationService.getUserByEmail(request.body.email);
    if (!user) {
      return reply.status(401).send(new Error("Invalid email or password"));
    }

    const token = await authenticationService.generateJWTToken(
      request.body.password,
      user
    );
    return reply.send({ token });
  } catch (error) {
    console.error("Error during login:", error);
    reply.status(500).send({ error });
  }
};
