// src/config/cors.ts

import { FastifyInstance } from "fastify";
import cors from "@fastify/cors";

export const configureCors = (
  app: FastifyInstance,
  allowedOrigins: string[]
) => {
  app.register(cors, {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true); // Autoriser l'origine
      } else {
        callback(new Error("Not allowed by CORS"), false); // Refuser l'origine
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Méthodes autorisées
    allowedHeaders: ["Content-Type", "Authorization"], // En-têtes autorisés
    credentials: true, // Permettre l'envoi de cookies
  });
};
