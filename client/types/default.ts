import z from 'zod';

export const DEFAULT_RETURN_SCHEMA = z.object({
  message: z.string().min(1),
});

export const DEFAULT_META_SCHEMA = z.object({
  isFirstPage: z.boolean(),
  isLastPage: z.boolean(),
  currentPage: z.number().nullish(),
  previousPage: z.number().nullish(),
  nextPage: z.number().nullish(),
  pageCount: z.number().nullish(),
  totalCount: z.number().nullish(),
});
