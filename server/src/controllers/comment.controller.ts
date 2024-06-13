import { Request, Response } from 'express';
import { prisma, tryCatch } from '../utils';
import { stringToObject } from '../helpers';
import { USER_DTO_IN_POST } from '../helpers/post.helper';

export const CommentController = {
  async index(req: Request, res: Response) {
    await tryCatch(async () => {
      const { page = 1, pageSize = 20, sort, postId } = req.query;
      const data = await prisma.comment
        .paginate({
          ...(sort && { orderBy: stringToObject(sort as string) }),
          where: {
            ...(postId && {
              postId: {
                equals: postId as string,
              },
            }),
          },
          include: {
            user: {
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
            select: USER_DTO_IN_POST,
          },
        },
      });
      return res.status(200).json(data);
    }, res);
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await tryCatch(async () => {
      const data = await prisma.comment.delete({
        where: { id },
      });
      if (!data) return res.status(404).json({ message: 'comment not found!' });
      return res.status(200).json({ message: 'Delete comment' });
    }, res);
  },
};
