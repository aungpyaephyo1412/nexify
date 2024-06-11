import { Request, Response } from 'express';
import { prisma, tryCatch } from '../utils';

export const CommentController = {
  async index(req: Request, res: Response) {
    await tryCatch(async () => {
      const { page = 1, pageSize = 20, sort, q = '', postId } = req.query;
      const data = await prisma.comment
        .paginate({
          ...(sort && { orderBy: JSON.parse(JSON.stringify(sort, null, 2)) }),
          where: {
            ...(postId && {
              postId: {
                equals: postId.toString(),
              },
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
      await prisma.comment.create({
        data: req.body,
      });
      return res.status(201).json({ message: 'Post created!' });
    }, res);
  },
  async show(req: Request, res: Response) {
    const { id } = req.params;
    await tryCatch(async () => {
      const data = await prisma.comment.findUnique({
        where: { id },
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
        },
      });
      return res.status(200).json(data);
    }, res);
  },
};
