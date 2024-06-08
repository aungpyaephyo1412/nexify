import * as z from "zod";

export const userAuthSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});
export const LoginDataSchema = z.object({
  _id: z.string(),
  username: z.string(),
  name: z.string(),
  email: z.string(),
  isVerified: z.boolean(),
  isAdmin: z.boolean(),
  isBlocked: z.boolean(),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
});
export type LoginData = z.infer<typeof LoginDataSchema>;

export const LoginUserSchema = z.object({
  data: LoginDataSchema,
  jwt: z.string(),
});
export type LoginUser = z.infer<typeof LoginUserSchema>;
