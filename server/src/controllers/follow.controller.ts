import { Request, Response } from 'express';
import { prisma, tryCatch } from '../utils';
import { stringToObject } from '../helpers';
import { USER_DTO_IN_POST } from '../helpers/post.helper';

export const FollowController = {
  async index(req: Request, res: Response) {
    await tryCatch(async () => {
      const {
        page = 1,
        pageSize = 20,
        sort,
        followerId,
        followingId,
      } = req.query;
      const data = await prisma.following
        .paginate({
          ...(sort && { orderBy: stringToObject(sort as string) }),
          ...(followerId && {
            where: {
              followerId: followerId as string,
            },
          }),
          ...(followingId && {
            where: {
              followingId: followingId as string,
            },
          }),
          include: {
            following: {
              select: USER_DTO_IN_POST,
            },
            follower: {
              select: USER_DTO_IN_POST,
            },
          },
        })
        .withPages({
          limit: +pageSize,
          page: +page,
          includePageCount: true,
        });
      return res.status(200).json({
        message: 'Users retrieve successfully!',
        data: data[0],
        meta: data[1],
      });
    }, res);
  },

  async follow(req: Request, res: Response) {
    await tryCatch(async () => {
      const { followerId, followingId } = req.body;
      const data = await prisma.following.findFirst({
        where: {
          AND: [
            {
              followerId,
            },
            {
              followingId,
            },
          ],
        },
      });
      if (data) return res.status(200).json({ message: 'Already followed' });
      await prisma.following.create({
        data: req.body,
      });
      return res.status(201).json({ message: 'Post created!' });
    }, res);
  },

  async unfollow(req: Request, res: Response) {
    await tryCatch(async () => {
      const { id } = req.params;
      await prisma.following.delete({
        where: {
          id,
        },
      });
      return res.status(200).json({ message: 'Unfollowed!' });
    }, res);
  },
};
