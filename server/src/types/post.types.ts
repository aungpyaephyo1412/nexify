import { z } from 'zod';

export const POST_CREATE_SCHEMA = z.object({
  caption: z.string().optional(),
  imageUrl: z.string().optional(),
});

export type POST_CREATE_TYPE = z.infer<typeof POST_CREATE_SCHEMA>;
