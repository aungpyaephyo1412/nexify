import { z } from 'zod';

export const createUserSchema = z.object({
  password: z.string().min(6),
  email: z.string().email().min(1),
});
export const loginUserSchema = z.object({
  identifier: z.string().min(1),
  password: z.string().min(6),
});
export const verifyUserSchema = z.object({
  email: z.string().email().min(1),
  token: z.string().min(5).max(5),
});
export const forgotSchema = z.object({
  email: z.string().email().min(1),
});
export const resetSchema = z.object({
  email: z.string().email().min(1),
  token: z.string().min(5),
  newPassword: z.string().min(1),
});
