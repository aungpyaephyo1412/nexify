import { z } from 'zod';

export const LIKE_SCHEMA = z.object({
  postId: z.string().min(1),
  userId: z.string().min(1),
});

export type LIKE_TYPE = z.infer<typeof LIKE_SCHEMA>;
