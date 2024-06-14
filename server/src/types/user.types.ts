import { z } from 'zod';

export const CREATE_USER_SCHEMA = z.object({
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
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
});
export type CREATE_USER_TYPE = z.infer<typeof CREATE_USER_SCHEMA>;

export const USER_UPDATE_SCHEMA = z.object({
  profilePicture: z.string().optional(),
  name: z.string().min(6),
  bio: z.string().optional(),
  dateOfBirth: z.coerce.date().optional(),
});
export const LOGIN_USER_SCHEMA = z.object({
  email: z.string().min(1),
  password: z.string().min(6),
});
export type LOGIN_USER_TYPE = z.infer<typeof LOGIN_USER_SCHEMA>;

export const VERIFY_USER_SCHEMA = z.object({
  email: z.string().email().min(1),
  token: z.string().min(4).max(4),
});
export type VERIFY_USER_TYPE = z.infer<typeof VERIFY_USER_SCHEMA>;

export const FORGOT_PASSWORD_SCHEMA = z.object({
  email: z.string().email().min(1),
});
export type FORGOT_PASSWORD_TYPE = z.infer<typeof FORGOT_PASSWORD_SCHEMA>;

export const RESET_PASSWORD_SCHEMA = z.object({
  email: z.string().email().min(1),
  token: z.string().min(5),
  newPassword: z.string().min(1),
});
export type RESET_PASSWORD_TYPE = z.infer<typeof RESET_PASSWORD_SCHEMA>;

export const RESEND_OTP_SCHEMA = z.object({
  email: z.string().email().min(1),
});

export type RESEND_OTP_TYPE = z.infer<typeof RESEND_OTP_SCHEMA>;
