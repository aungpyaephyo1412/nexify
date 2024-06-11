import z from "zod";

export const commentCreateSchema = z.object({
  caption: z.string().min(1).max(256),
});

export const CommentUserSchema = z.object({
  id: z.string(),
  bio: z.null(),
  email: z.string(),
  name: z.string(),
  username: z.string(),
  profilePicture: z.null(),
  gender: z.string(),
});
export type CommentUser = z.infer<typeof CommentUserSchema>;

export const MetaSchema = z.object({
  isFirstPage: z.boolean(),
  isLastPage: z.boolean(),
  currentPage: z.number(),
  previousPage: z.null(),
  nextPage: z.null(),
  pageCount: z.number(),
  totalCount: z.number(),
});
export type Meta = z.infer<typeof MetaSchema>;

export const CommentDatumSchema = z.object({
  id: z.string(),
  caption: z.string(),
  postId: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  user: CommentUserSchema,
});
export type Datum = z.infer<typeof CommentDatumSchema>;

export const PostsSchema = z.object({
  message: z.string(),
  data: z.array(CommentDatumSchema),
  meta: MetaSchema,
});
export type Posts = z.infer<typeof PostsSchema>;
