import Fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import userRoutes from "#modules/user/user.routes";
import authenticationRoute from "#modules/authentication/authentication.routes";
import authenticate from "#plugins/authenticate";
import swaggerPlugin from "#plugins/swagger";
import prismaPlugin from "./plugins/db";
import dotenv from "dotenv";

dotenv.config();

const app = Fastify({
  logger: true,
});

// Configurer le plugin JWT
app.register(fastifyJwt, { secret: process.env.SECRET_JWT as string });

// Enregistrer  le hook JWT
app.register(authenticate);

app.register(prismaPlugin);
app.register(swaggerPlugin);

app.register(authenticationRoute);
app.register(userRoutes, { prefix: "/users" });

app.get("/healthcheck", async () => {
  return { status: "ok" };
});

app.listen({ port: 3000 }, (err, address) => {
  console.log(`Server is running at ${address}`);
  console.log(`Swagger UI available at ${address}/docs`);

  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
