import { Request, Response } from 'express';
import { prisma, tryCatch } from '../utils';

export const FollowController = {
  async index(req: Request, res: Response) {
    await tryCatch(async () => {
      const {
        page = 1,
        pageSize = 20,
        sort,
        q = '',
        followerId,
        followingId,
      } = req.query;
      const data = await prisma.following
        .paginate({
          ...(sort && { orderBy: JSON.parse(JSON.stringify(sort, null, 2)) }),
          ...(followerId && {
            where: {
              followerId: followerId.toString(),
            },
          }),
          ...(followingId && {
            where: {
              followingId: followingId.toString(),
            },
          }),
          include: {
            ...(followerId && {
              following: {
                select: {
                  id: true,
                  username: true,
                  name: true,
                  email: true,
                  profilePicture: true,
                },
              },
            }),
            ...(followingId && {
              follower: {
                select: {
                  id: true,
                  username: true,
                  name: true,
                  email: true,
                  profilePicture: true,
                },
              },
            }),
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
              followerId: {
                equals: followerId,
              },
            },
            {
              followingId: {
                equals: followingId,
              },
            },
          ],
        },
      });
      if (data) return res.status(400).json({ message: 'Already followed' });
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
