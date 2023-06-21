import { FastifyInstance } from "fastify";
import { loginHandler, signUpHandler } from "./user.controller";
import { $ref } from "./user.schema";

const userRoutes = async (server: FastifyInstance) => {
  server.post(
    "/login",
    {
      schema: {
        body: $ref("loginSchema"),
      },
    },
    loginHandler
  );
  server.post(
    "/signup",
    {
      schema: {
        body: $ref("signupSchema"),
      },
    },
    signUpHandler
  );
};

export default userRoutes;
