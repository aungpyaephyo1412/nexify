import { Request, Response } from 'express';
import { isEmptyObj, prisma, tryCatch } from '../utils';
import { stringToObject } from '../helpers';
import { USER_DTO_IN_POST } from '../helpers/post.helper';

export const PostController = {
  async index(req: Request, res: Response) {
    await tryCatch(async () => {
      const { page = 1, pageSize = 45, sort, q,userId } = req.query;
      let username;
      if (userId){
        const data = await prisma.user.findUnique({where : {
          username : userId as string
          }})
        if (!data)
          return res.status(400).json({ message: 'Something went wrong!' });
        username = data.id
      }
      const data = await prisma.post
        .paginate({
          ...(sort && { orderBy: stringToObject(sort as string) }),
          where: {
            ...(q && {
              OR: [
                {
                  caption: {
                    contains: q.toString(),
                    mode: 'insensitive',
                  },
                },
              ],
            }),
            ...(username && {userId : username as string})
          },
          include: {
            user: {
              select: USER_DTO_IN_POST,
            },
            _count: true,
            Comment: {
              include: {
                user: {
                  select: USER_DTO_IN_POST,
                },
              },
            },
            Like: {
              include: {
                user: {
                  select: USER_DTO_IN_POST,
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

  async followingPosts(req: Request, res: Response) {
    const { userId } = req.params;
    await tryCatch(async () => {
      const followings =await prisma.following.findMany({where : {
        followerId : userId?.toString()
        }})
      const { page = 1, pageSize = 45, sort, q } = req.query;
      const data = await prisma.post
        .paginate({
          ...(sort && { orderBy: stringToObject(sort as string) }),
          where: {
            ...(q && {
              OR: [
                {
                  caption: {
                    contains: q.toString(),
                    mode: 'insensitive',
                  },
                },
              ],
            }),
            userId : {
              in : [...followings.map(f=>f.followingId)]
            }
          },
          include: {
            user: {
              select: USER_DTO_IN_POST,
            },
            _count: true,
            Comment: {
              include: {
                user: {
                  select: USER_DTO_IN_POST,
                },
              },
            },
            Like: {
              include: {
                user: {
                  select: USER_DTO_IN_POST,
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
      if (isEmptyObj(req.body))
        return res.status(400).json({ message: 'Request body not found!' });
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
                select: USER_DTO_IN_POST,
              },
            },
          },
          Like: {
            include: {
              user: {
                select: USER_DTO_IN_POST,
              },
            },
          },
          user: {
            select: USER_DTO_IN_POST,
          },
        },
      });
      return res.status(200).json(data);
    }, res);
  },

  async delete(req: Request, res: Response) {
    await tryCatch(async () => {
      const { id } = req.params;
      await prisma.post.delete({
        where: {
          id,
        },
      });
      return res.status(200).json({
        message: 'Delete post!',
      });
    }, res);
  },
};
