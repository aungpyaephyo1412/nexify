import { Request, Response } from 'express';
import { isEmptyObj, prisma, tryCatch } from '../utils';
export const UsersController = {
  async index(req: Request, res: Response) {
    await tryCatch(async () => {
      const { page = 1, pageSize = 20, sort, q = '' } = req.query;
      const data = await prisma.user
        .paginate({
          ...(sort && { orderBy: JSON.parse(JSON.stringify(sort, null, 2)) }),
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
    const data = await prisma.user.findUnique({
      where: {
        username: id.toString(),
      },
      include: {
        Followers: true,
        Following: true,
        _count: true,
      },
    });
    if (!data) return res.status(404).json({ error: 'User not found!' });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = data;
    return res.status(200).json({
      message: 'User retrieve successfully!',
      data: user,
    });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    if (isEmptyObj(req.body)) {
      return res.status(400).json({ error: 'Body Required!' });
    }
    await tryCatch(async () => {
      await prisma.user.update({
        where: { id: id.toString() },
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
          id: id.toString(),
        },
      });
      return res.sendStatus(204);
    }, res);
  },
};
export default UsersController;
