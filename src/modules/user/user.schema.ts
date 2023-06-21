import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string(),
});

const signupSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string(),
  name: z.string(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    loginSchema,
    signupSchema,
  },
  { $id: "userSchemas" }
);
