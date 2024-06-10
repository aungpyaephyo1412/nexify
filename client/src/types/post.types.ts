import z from "zod";

export const PostUserSchema = z.object({
  _id: z.string(),
  username: z.string(),
  name: z.string(),
  email: z.string(),
  followers: z.array(z.any()),
  following: z.array(z.any()),
  posts: z.array(z.any()),
  isVerified: z.boolean(),
  isAdmin: z.boolean(),
  isBlocked: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  __v: z.number(),
});
export type PostUser = z.infer<typeof PostUserSchema>;

export const PostDataSchema = z.object({
  _id: z.string(),
  user: PostUserSchema,
  caption: z.string().optional(),
  imageUrl: z.string().optional(),
  likes: z.array(z.any()),
  comments: z.array(z.any()),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  __v: z.number(),
});
export type PostData = z.infer<typeof PostDataSchema>;

export const PostsSchema = z.object({
  data: z.array(PostDataSchema),
});
export type Posts = z.infer<typeof PostsSchema>;

export const PostCreateSchema = z.object({
  caption: z.string().min(1),
});
export type PostCreate = z.infer<typeof PostCreateSchema>;

export const PostCreateReturnSchema = z.object({
  message: z.string().min(1),
});
