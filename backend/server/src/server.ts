import Fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import userRoutes from "./modules/user/user.routes";
import authenticationRoute from "./modules/authentication/authentication.routes";
import authenticate from "./plugins/authenticate";
import swaggerPlugin from "./plugins/swagger";
import prismaPlugin from "./plugins/db";
import dotenv from "dotenv";
import { configureCors } from "./config/cors";

dotenv.config();

const app = Fastify({
  logger: true,
});

// Configurer CORS
const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:8000"];
configureCors(app, allowedOrigins);

// Configurer le plugin JWT
app.register(fastifyJwt, { secret: process.env.SECRET_JWT as string });

// Enregistrer le hook JWT
app.register(authenticate);

// Enregistrer Prisma plugin
app.register(prismaPlugin);

// Enregistrer swagger plugin
app.register(swaggerPlugin);
// Enregistrer les routes
app.register(authenticationRoute);
app.register(userRoutes, { prefix: "/users" });

app.get("/healthcheck", async () => {
  const dbStatus = await app.prisma.$queryRaw`SELECT 1;`;
  return { status: "ok", database: dbStatus ? "connected" : "disconnected" };
});

app.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  console.log(`Server is running at ${address}`);
  console.log(`Swagger UI available at ${address}/docs`);
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
