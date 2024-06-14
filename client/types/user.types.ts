import z from 'zod';

export const AUTH_USER_SCHEMA = z.object({
  id: z.string().min(1),
  username: z.string().min(1),
  name: z.string().min(1),
  bio: z.string().nullish(),
  dateOfBirth: z.string().nullish(),
  profilePicture: z.string().nullish(),
  email: z.string().email().min(1),
  isVerified: z.boolean(),
  isAdmin: z.boolean(),
  isBlocked: z.boolean(),
  createdAt: z.string().min(1),
  jwt: z.string().min(1),
});

export type AUTH_USER = z.infer<typeof AUTH_USER_SCHEMA>;

export const LOGIN_USER_DATA_SCHEMA = z.object({
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
export type LOGIN_USER_DATA = z.infer<typeof LOGIN_USER_DATA_SCHEMA>;

export const LOGIN_USER_SCHEMA = z.object({
  data: LOGIN_USER_DATA_SCHEMA,
  jwt: z.string(),
});
export type LOGIN_USER = z.infer<typeof LOGIN_USER_SCHEMA>;

export const USER_LOGIN_SCHEMA = z.object({
  email: z
    .string()
    .email({ message: 'Email or Username is invalid' })
    .min(1, { message: 'Email or Username is required' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});
export const USER_REGISTER_SCHEMA = z.object({
  email: z.string().email({ message: 'Email is invalid' }).min(1, { message: 'Email is required' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  name: z
    .string()
    .min(6, { message: 'Name must be at least 6 characters' })
    .max(50, { message: 'Name must be 50 characters' }),
  gender: z.string().min(1, { message: 'Gender required' }),
});
export const USER_EMAIL_VERIFY_SCHEMA = z.object({
  token: z
    .string()
    .min(4, { message: 'Token is at least 4' })
    .max(4, { message: 'Token is required' }),
  email: z.string().email({ message: 'Email is invalid' }).min(1, { message: 'Email is required' }),
});

export const FORGOT_PASSWORD_SCHEMA = z.object({
  email: z.string().email().min(1),
});
export const USER_PASSWORD_RESET_SCHEMA = z
  .object({
    code: z.string().min(1),
    password: z.string().min(5),
    confirmPassword: z.string().min(5),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword', 'password'],
  });

export const USER_BY_ID_SCHEMA = z.object({
  data: z.object({
    id: z.string().min(1),
    bio: z.string().nullish(),
    name: z.string().min(1),
    email: z.string().email().min(1),
    gender: z.string().min(1),
    isAdmin: z.boolean(),
    username: z.string().min(1),
    isBlocked: z.boolean(),
    createdAt: z.string().min(1),
    isVerified: z.boolean(),
    dateOfBirth: z.string().nullish(),
    profilePicture: z.string().nullish(),
    Followers: z.array(
      z.object({
        id: z.string(),
        followerId: z.string(),
        followingId: z.string(),
      }),
    ),
    Following: z.array(
      z.object({
        id: z.string(),
        followerId: z.string(),
        followingId: z.string(),
      }),
    ),
    _count: z.object({
      Followers: z.number(),
      Following: z.number(),
      Post: z.number(),
    }),
  }),
});
export type USER_BY_ID = z.infer<typeof USER_BY_ID_SCHEMA>;

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const USER_UPDATE_SCHEMA = z.object({
  profilePicture: z.string().nullish(),
  name: z.string().min(6),
  bio: z.string().nullish(),
  dateOfBirth: z.string().date().optional(),
  image: z
    .any()
    .refine((file) => {
      return file && file.length > 0 ? file[0].size <= MAX_FILE_SIZE : true;
    }, `Max image size is 5MB.`)
    .refine(
      (file) => (file && file.length > 0 ? ACCEPTED_IMAGE_TYPES.includes(file[0].type) : true),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
});

export const USER_FOLLOW_SCHEMA = z.object({
  followingId: z.string().min(1),
  slug: z.string().min(1),
});

export const USER_UNFOLLOW_SCHEMA = z.object({
  unfollowId: z.string().min(1),
  slug: z.string().min(1),
  followingId: z.string().min(1),
});
