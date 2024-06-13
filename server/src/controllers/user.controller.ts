import { Request, Response } from 'express';
import { isEmptyObj, prisma, tryCatch } from '../utils';
import { stringToObject } from '../helpers';
import { USER_BY_ID_DTO, USER_DTO } from '../helpers/user.helper';
export const UsersController = {
  async index(req: Request, res: Response) {
    await tryCatch(async () => {
      const { page = 1, pageSize = 20, sort, q } = req.query;
      const data = await prisma.user
        .paginate({
          ...(sort && { orderBy: stringToObject(sort as string) }),
          where: {
            ...(q && {
              OR: [
                {
                  name: {
                    contains: q.toString(),
                    mode: 'insensitive', // Default value: default
                  },
                },
                {
                  username: {
                    contains: q.toString(),
                    mode: 'insensitive', // Default value: default
                  },
                },
              ],
            }),
          },
          select: USER_DTO,
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

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const data = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: id,
          },
          {
            id,
          },
        ],
      },
      select: USER_BY_ID_DTO,
    });
    if (!data) return res.status(404).json({ error: 'User not found!' });
    return res.status(200).json({
      message: 'User retrieve successfully!',
      data,
    });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    if (isEmptyObj(req.body)) {
      return res.status(400).json({ error: 'Body Required!' });
    }
    await tryCatch(async () => {
      await prisma.user.update({
        where: { id },
        data: req.body,
      });
      return res.status(200).json({ message: 'Update user successfully!' });
    }, res);
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await tryCatch(async () => {
      await prisma.user.delete({
        where: {
          id,
        },
      });
      return res.status(200).json({ message: 'Delete user!' });
    }, res);
  },
};
