import Fastify from "fastify";
import userRoutes from "./modules/user/user.routes";
const app = Fastify({
  logger: true,
});

app.listen({ port: 3000 }, function (err, address) {
  console.log("Server is running on port 3000 !");
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
