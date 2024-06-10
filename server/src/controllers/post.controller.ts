import { Request, Response } from 'express';
import { PostModel } from '../models/post.service';

export const PostsController = {
  async index(_: Request, res: Response) {
    try {
      const data = await PostModel.find()
        .populate({
          path: 'user',
          select:
            '-password -notifications -stories -messages -rememberToken -expiredToken -resetToken',
        })
        .sort({
          createdAt: 'descending',
        });
      return res.status(200).json({ data });
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const data = await PostModel.findById(id).populate({
      path: 'user',
      select:
        '-password -notifications -stories -messages -rememberToken -expiredToken -resetToken',
    });
    if (!data) return res.status(404).json({ error: 'User not found!' });
    return res.status(200).json(data);
  },
  async store(req: Request, res: Response) {
    try {
      const data = await PostModel.create(req.body);
      console.log(data);
      return res.status(201).json({ message: 'Post created' });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: 'Something went wrong!' });
    }
  },
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const post = await PostModel.findById(id).select('-password');
    if (!post)
      return res.status(400).json({ message: 'Something went wrong!' });
    await post.save();
    return res.status(200).json({ message: 'Update user successfully!' });
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const user = await PostModel.findByIdAndDelete(id);
    if (!user) return res.status(400).json({ message: 'User not found!' });
    return res.sendStatus(204);
  },
};
