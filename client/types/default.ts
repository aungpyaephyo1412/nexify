import z from 'zod';

export const DEFAULT_RETURN_SCHEMA = z.object({
  message: z.string().min(1),
});
