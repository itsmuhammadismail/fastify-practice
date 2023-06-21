import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { SignupInput } from "./user.schema";

export const findUserByEmail = async (email: string) => {
  const result = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  return result;
};

export const createSignup = async (user: SignupInput) => {
  const { hash, salt } = hashPassword(user.password);
  const createuser = await prisma.user.create({
    data: { email: user.email, password: hash, name: user.name, salt },
  });
  return createuser;
};
