import z from "zod";

export const FollowingUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string(),
  email: z.string(),
  profilePicture: z.string().nullish(),
});
export type FollowingUser = z.infer<typeof FollowingUserSchema>;

export const MetaSchema = z.object({
  isFirstPage: z.boolean(),
  isLastPage: z.boolean(),
  currentPage: z.number(),
  previousPage: z.number().nullish(),
  nextPage: z.number().nullish(),
  pageCount: z.number(),
  totalCount: z.number(),
});
export type Meta = z.infer<typeof MetaSchema>;

export const FollowDatumSchema = z.object({
  id: z.string(),
  followerId: z.string(),
  followingId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  following: FollowingUserSchema,
});
export type FollowDatum = z.infer<typeof FollowDatumSchema>;

export const FollowingSchema = z.object({
  message: z.string(),
  data: z.array(FollowDatumSchema),
  meta: MetaSchema,
});
export type Followings = z.infer<typeof FollowingSchema>;

export const FollowerDatumSchema = z.object({
  id: z.string(),
  followerId: z.string(),
  followingId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  follower: FollowingUserSchema,
});
export type FollowerData = z.infer<typeof FollowerDatumSchema>;

export const FollowersSchema = z.object({
  message: z.string(),
  data: z.array(FollowerDatumSchema),
  meta: MetaSchema,
});
export type Followers = z.infer<typeof FollowingSchema>;
