import z from "zod";

export const AuthUserSchema = z.object({
  id: z.string().min(1),
  username: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email().min(1),
  isVerified: z.boolean(),
  isAdmin: z.boolean(),
  isBlocked: z.boolean(),
  createdAt: z.string().min(1),
  jwt: z.string().min(1),
});

export type AuthUser = z.infer<typeof AuthUserSchema>;
