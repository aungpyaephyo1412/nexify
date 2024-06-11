import { z } from 'zod';

export const createUserSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email is invalid' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  name: z
    .string()
    .min(1, { message: 'Name must be at least 1 character' })
    .max(50, { message: 'Name must be 50 characters' }),
  gender: z.enum(['MALE', 'FEMALE', 'CUSTOM']),
});
export type createUser = z.infer<typeof createUserSchema>;
export const loginUserSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(6),
});
export const verifyUserSchema = z.object({
  email: z.string().email().min(1),
  token: z.string().min(9).max(9),
});
export const forgotSchema = z.object({
  email: z.string().email().min(1),
});
export const resetSchema = z.object({
  email: z.string().email().min(1),
  token: z.string().min(5),
  newPassword: z.string().min(1),
});
