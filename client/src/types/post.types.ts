import z from "zod";

export const PostUserSchema = z.object({
  id: z.string().min(1),
  bio: z.string().nullish(),
  email: z.string().email(),
  name: z.string().min(1),
  username: z.string().min(1),
  profilePicture: z.string().nullish(),
  gender: z.string().min(1),
});
export type PostUser = z.infer<typeof PostUserSchema>;

export const PostDataSchema = z.object({
  id: z.string(),
  user: PostUserSchema,
  caption: z.string().nullish(),
  imageUrl: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  _count: z.object({
    Like: z.number(),
    Comment: z.number(),
  }),
  Like: z.array(
    z.object({
      id: z.string().min(1),
      postId: z.string().min(1),
      userId: z.string().min(1),
      createdAt: z.coerce.date(),
      updatedAt: z.coerce.date(),
      user: z.object({
        id: z.string().min(1),
        username: z.string().min(1),
        name: z.string().min(1),
      }),
    })
  ),
});
export type PostData = z.infer<typeof PostDataSchema>;

export const PostsSchema = z.object({
  data: z.array(PostDataSchema),
  meta: z.object({
    isFirstPage: z.boolean(),
    isLastPage: z.boolean(),
    currentPage: z.number().nullish(),
    previousPage: z.number().nullish(),
    nextPage: z.number().nullish(),
    pageCount: z.number().nullish(),
    totalCount: z.number().nullish(),
  }),
});
export type Posts = z.infer<typeof PostsSchema>;

export const PostCreateSchema = z.object({
  caption: z.string().min(1),
});
export type PostCreate = z.infer<typeof PostCreateSchema>;

export const PostCreateReturnSchema = z.object({
  message: z.string().min(1),
});
