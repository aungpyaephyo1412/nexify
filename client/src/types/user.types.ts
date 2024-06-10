import * as z from "zod";
export const userLoginSchema = z.object({
  identifier: z
    .string()
    .email({ message: "Email or Username is invalid" })
    .min(1, { message: "Email or Username is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
export const userAuthSchema = z.object({
  email: z
    .string()
    .email({ message: "Email is invalid" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  name: z
    .string()
    .min(6, { message: "Name must be at least 6 characters" })
    .max(50, { message: "Name must be 50 characters" }),
  gender: z.string().min(1, { message: "Gender required" }),
});
export const userVerifySchema = z.object({
  token: z
    .string()
    .min(9, { message: "Token is at least 9" })
    .max(9, { message: "Token is required" }),
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

export const RegisterReturnSchema = z.object({
  message: z.string().min(1),
});

export const userByIdDataSchema = z.object({
  _id: z.string(),
  username: z.string(),
  name: z.string(),
  email: z.string(),
  followers: z.array(z.any()),
  following: z.array(z.any()),
  posts: z.array(z.any()),
  isVerified: z.boolean(),
  isAdmin: z.boolean(),
  isBlocked: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  __v: z.number(),
});
export type userByIdData = z.infer<typeof userByIdDataSchema>;

export const UserByIdDataSchema = z.object({
  data: userByIdDataSchema,
});
export type UserByIdData = z.infer<typeof UserByIdDataSchema>;
