import { Request, Response } from 'express';
import { prisma, tryCatch } from '../utils';

export const LikeController = {
  async like(req: Request, res: Response) {
    await tryCatch(async () => {
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
