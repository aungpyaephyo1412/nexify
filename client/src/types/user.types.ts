import * as z from "zod";
export const userLoginSchema = z.object({
  email: z
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
  id: z.string().min(1),
  bio: z.string().nullish(),
  isVerified: z.boolean(),
  email: z.string().email(),
  name: z.string().min(1),
  username: z.string().min(1),
  profilePicture: z.string().nullish(),
  gender: z.string().min(1),
  isAdmin: z.boolean(),
  isBlocked: z.boolean(),
  dateOfBirth: z.string().nullish(),
  createdAt: z.string().min(1),
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
export const CountSchema = z.object({
  Post: z.number(),
  Following: z.number(),
  Followers: z.number(),
});
export const userByIdDataSchema = z.object({
  id: z.string(),
  profilePicture: z.string().nullish(),
  name: z.string(),
  email: z.string(),
  username: z.string(),
  bio: z.string().nullish(),
  gender: z.string(),
  isVerified: z.boolean(),
  isAdmin: z.boolean(),
  isBlocked: z.boolean(),
  dateOfBirth: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  _count: CountSchema,
});
export type userByIdData = z.infer<typeof userByIdDataSchema>;

export const UserByIdDataSchema = z.object({
  data: userByIdDataSchema,
});
export type UserByIdData = z.infer<typeof UserByIdDataSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email().min(1),
});
