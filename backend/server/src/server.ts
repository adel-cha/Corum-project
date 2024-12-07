import Fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import userRoutes from "#modules/user/user.routes";
import authenticationRoute from "#modules/authentication/authentication.routes";
import authenticate from "#plugins/authenticate";

import prismaPlugin from "./plugins/db";
const app = Fastify({
  logger: true,
});

// Configurer le plugin JWT
app.register(fastifyJwt, {
  secret: "your-secure-secret", // Remplacez par une clé secrète sécurisée
});
// Enregistrer  le hook JWT
app.register(authenticate);

app.get("/healthcheck", async () => {
  return { status: "ok" };
});

app.register(prismaPlugin);
app.register(authenticationRoute);
app.register(userRoutes, { prefix: "/users" });

app.listen({ port: 3000 }, (err, address) => {
  console.log("Server is running on ", address);
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
