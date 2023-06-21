import { FastifyReply, FastifyRequest } from "fastify";
import { LoginInput, SignupInput } from "./user.schema";
import { createSignup, findUserByEmail } from "./user.service";
import { verifyPassword } from "../../utils/hash";

export const loginHandler = async (
  req: FastifyRequest<{
    Body: LoginInput;
  }>,
  reply: FastifyReply
) => {
  const body = req.body;
  const checkEmail = await findUserByEmail(body.email);
  if (!checkEmail)
    return reply.code(400).send({ message: "Email is incorrect" });

  const verPasswprd = verifyPassword({
    candidatePassword: body.password,
    hash: checkEmail.password,
    salt: checkEmail.salt,
  });

  if (!verPasswprd)
    return reply.code(400).send({ message: "Password is incorrect" });

  const accessToken = req.jwt.sign({
    id: checkEmail.id,
    email: checkEmail.email,
  });

  return reply.send({
    ...checkEmail,
    accessToken,
  });
};

export const signUpHandler = async (
  req: FastifyRequest<{
    Body: SignupInput;
  }>,
  reply: FastifyReply
) => {
  const body = req.body;
  const checkEmail = await findUserByEmail(body.email);

  if (checkEmail)
    return reply.code(400).send({ message: "user already exist" });

  const createuser = await createSignup(body);
  return reply.send(createuser);
};
