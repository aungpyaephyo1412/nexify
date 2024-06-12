import * as z from "zod";

export const userResetPasswordSchema = z
  .object({
    password: z.string().min(5),
    confirmPassword: z.string().min(5),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
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

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const userUpdateSchema = z.object({
  name: z.string().min(6),
  bio: z.string(),
  image: z
    .any()
    .refine((file) => {
      return file && file.length > 0 ? file[0].size <= MAX_FILE_SIZE : true;
    }, `Max image size is 5MB.`)
    .refine(
      (file) =>
        file && file.length > 0
          ? ACCEPTED_IMAGE_TYPES.includes(file[0].type)
          : true,
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});
