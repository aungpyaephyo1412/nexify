import { Request, Response } from 'express';
import { prisma, tryCatch } from '../utils';

export const PostController = {
  async index(req: Request, res: Response) {
    await tryCatch(async () => {
      const { page = 1, pageSize = 20, sort, q = '' } = req.query;
      const data = await prisma.post
        .paginate({
          ...(sort && { orderBy: JSON.parse(JSON.stringify(sort, null, 2)) }),
          where: {
            ...(q && {
              OR: [
                {
                  caption: {
                    contains: q.toString(),
                    mode: 'insensitive', // Default value: default
                  },
                },
              ],
            }),
          },
          include: {
            user: {
              select: {
                id: true,
                bio: true,
                email: true,
                name: true,
                username: true,
                profilePicture: true,
                gender: true,
              },
            },
            _count: true,
            Comment: {
              include: {
                user: {
                  select: {
                    id: true,
                    username: true,
                    name: true,
                  },
                },
              },
            },
            Like: {
              include: {
                user: {
                  select: {
                    id: true,
                    username: true,
                    name: true,
                  },
                },
              },
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
  async store(req: Request, res: Response) {
    await tryCatch(async () => {
      await prisma.post.create({
        data: req.body,
      });
      return res.status(201).json({ message: 'Post created!' });
    }, res);
  },
  async show(req: Request, res: Response) {
    const { id } = req.params;
    await tryCatch(async () => {
      const data = await prisma.post.findUnique({
        where: { id },
        include: {
          _count: true,
          Comment: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  name: true,
                },
              },
            },
          },
          Like: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  name: true,
                },
              },
            },
          },
          user: {
            select: {
              id: true,
              bio: true,
              email: true,
              name: true,
              username: true,
              profilePicture: true,
              gender: true,
            },
          },
        },
      });
      return res.status(200).json(data);
    }, res);
  },
};
