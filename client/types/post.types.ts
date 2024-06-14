import { DEFAULT_META_SCHEMA } from '@/types/default';
import z from 'zod';
export const POSTS_USER_SCHEMA = z.object({
  id: z.string().min(1),
  isAdmin: z.boolean(),
  bio: z.string().nullish(),
  name: z.string().min(1),
  username: z.string().min(1),
  profilePicture: z.string().nullish(),
});
export const POST_COUNT_SCHEMA = z.object({
  Like: z.number(),
  Comment: z.number(),
});
export const POSTS_DATA_SCHEMA = z.object({
  id: z.string().min(1),
  caption: z.string().nullish(),
  imageUrl: z.string().nullish(),
  userId: z.string().min(1),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
  user: POSTS_USER_SCHEMA,
  _count: POST_COUNT_SCHEMA,
  Comment: z.array(POSTS_USER_SCHEMA),
  Like: z.array(POSTS_USER_SCHEMA),
});
export type POSTS_DATA_TYPE = z.infer<typeof POSTS_DATA_SCHEMA>;

export const POSTS_SCHEMA = z.object({
  data: z.array(POSTS_DATA_SCHEMA),
  meta: DEFAULT_META_SCHEMA,
});

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
export const POST_CREATE_SCHEMA = z.object({
  caption: z.string().optional(),
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
export type POST_CREATE_TYPE = z.infer<typeof POST_CREATE_SCHEMA>;
