import { z } from 'zod';

export const FOLLOW_SCHEMA = z.object({
  followerId: z.string().min(1),
  followingId: z.string().min(1),
});
