import { z } from 'zod';

export const POST_CREATE_SCHEMA = z.object({
  userId: z.string().min(1),
  caption: z.string().optional(),
  imageUrl: z.string().optional(),
});

export type POST_CREATE_TYPE = z.infer<typeof POST_CREATE_SCHEMA>;

export const CREATE_COMMENT_SCHEMA = z.object({
  userId: z.string().min(1),
  postId: z.string().min(1),
  caption: z.string().min(1),
});
