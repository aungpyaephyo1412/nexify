import { Request, Response } from 'express';
import { prisma, tryCatch } from '../utils';
import { LIKE_TYPE } from '../types/like.types';

export const LikeController = {
  async like(req: Request, res: Response) {
    await tryCatch(async () => {
      const { userId, postId }: LIKE_TYPE = req.body;
      const data = await prisma.like.findFirst({
        where: {
          AND: [
            {
              userId,
            },
            {
              postId,
            },
          ],
        },
      });
      if (data) return res.status(200).json({ message: 'Like' });
      await prisma.like.create({
        data: req.body,
      });
      return res.status(201).json({ message: 'Like post' });
    }, res);
  },

  async unlike(req: Request, res: Response) {
    const { id } = req.params;
    await tryCatch(async () => {
      await prisma.like.delete({
        where: {
          id,
        },
      });
      return res.status(200).json({
        message: 'Unlike post',
      });
    }, res);
  },
};
