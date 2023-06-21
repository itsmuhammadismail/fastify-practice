import jwt from "@fastify/jwt";

import fastify, { FastifyReply, FastifyRequest } from "fastify";
import dotenv from "dotenv";
import userRoutes from "./src/modules/user/user.route";
import { userSchemas } from "./src/modules/user/user.schema";

const server = fastify();

// Hooks
server.addHook("preHandler", (req, reply, next) => {
  req.jwt = server.jwt;
  return next();
});

for (const schema of [...userSchemas]) {
  server.addSchema(schema);
}

server.register(jwt, {
  secret: process.env.JWT_SECRET!,
});


server.register(userRoutes, { prefix: "user" });

server.listen({ port: 5000, host: "0.0.0.0" });
