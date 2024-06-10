import { Request, Response } from 'express';
import { UserModel } from '../models/user.service';

export const UsersController = {
  async index(_: Request, res: Response) {
    try {
      const data = await UserModel.find().select(
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
    const data = await UserModel.findOne({
       username: id 
    }).select(
      '-password -stories -notifications -messages -rememberToken -expiredToken -resetToken'
    );
    if (!data) return res.status(404).json({ error: 'User not found!' });
    return res.status(200).json({ data });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { username, email } = req.body;
    const user = await UserModel.findById(id).select('-password');
    if (!user)
      return res.status(400).json({ message: 'Something went wrong!' });
    user.username = username;
    user.email = email;
    await user.save();
    return res.status(200).json({ message: 'Update user successfully!' });
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) return res.status(400).json({ message: 'User not found!' });
    return res.sendStatus(204);
  },
};
