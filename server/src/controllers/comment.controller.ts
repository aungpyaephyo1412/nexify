import { Request, Response } from 'express';
import { CommentModel } from '../models/comment.service';

export const CommentsController = {
  async index(_: Request, res: Response) {
    try {
      const data = await CommentModel.find().select(
        '-password -stories -notifications -messages -rememberToken -expiredToken -resetToken'
      );
      return res.status(200).json({ data });
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const data = await CommentModel.findOne({
      username: id,
    }).select(
      '-password -stories -notifications -messages -rememberToken -expiredToken -resetToken'
    );
    if (!data) return res.status(404).json({ error: 'Comment not found!' });
    return res.status(200).json({ data });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const user = await CommentModel.findByIdAndUpdate(id, req.body).select(
      '-password'
    );
    if (!user)
      return res.status(400).json({ message: 'Something went wrong!' });
    await user.save();
    return res.status(200).json({ message: 'Update user successfully!' });
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const user = await CommentModel.findByIdAndDelete(id);
    if (!user) return res.status(400).json({ message: 'Comment not found!' });
    return res.sendStatus(204);
  },
};
