import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.service';
import { createJwt, passwordHash } from '../utils';
import { faker } from '@faker-js/faker';
import { message, transporter, verify_registerMessage } from '../utils/mail';

export const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const hashPassword = await passwordHash(req.body.password);
      const rememberToken = faker.number.int({ min: 10000, max: 99999 });
      const email = req.body.email;
      await UserModel.create({
        username: req.body.username,
        password: hashPassword,
        rememberToken,
        email,
      });
      await transporter.sendMail(
        verify_registerMessage(rememberToken, [email])
      );
      return res
        .status(200)
        .send({ message: 'Registration successful,Check your email' });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'User already existed' });
    }
  },
  async verify(req: Request, res: Response) {
    try {
      const { email, token } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) return res.status(404).json({ error: 'User not found!' });
      if (user.rememberToken !== token)
        return res.status(400).json({ error: 'Invalid token!' });
      user.isVerified = true;
      user.rememberToken = null;
      await user.save();
      return res.status(200).send({ message: 'Email verified successful!' });
    } catch (e) {
      console.log(e);
      return res.status(400).send({ message: 'Something went wrong!' });
    }
  },
  async login(req: Request, res: Response) {
    const { identifier, password } = req.body;
    const response = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select(
      '-followers -following -posts -stories -notifications -messages -rememberToken -expiredToken -resetToken'
    );
    if (!response)
      return res.status(400).send({ message: 'Something went wrong!' });
    const user = response.toObject();
    const check = await bcrypt.compare(password, user.password);
    const { password: p, ...userData } = user;
    if (!check)
      return res
        .status(400)
        .send({ message: 'Email or password does not work!' });
    return res.status(200).send({
      data: {
        ...userData,
      },
      jwt: createJwt({ p, ...userData }),
    });
  },
  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) return res.status(400).send({ message: 'User not found' });
      const token = crypto.randomUUID().toString();
      await transporter.sendMail(message(token, [user.email], user.name));
      user.resetToken = token;
      user.expiredToken = new Date(Date.now() + 60 * 60 * 100);
      await user.save();
      return res.status(200).json({
        message: 'Email sent',
      });
    } catch (e) {
      console.log(e);
      return res.status(400).send({ message: 'Something went wrong!' });
    }
  },
  async resetPassword(req: Request, res: Response) {
    try {
      const { token, email, newPassword } = req.body;
      const user = await UserModel.findOne({
        email: email,
        expiredToken: { $gt: new Date(Date.now()) },
        resetToken: token,
      });
      if (!user)
        return res.status(400).send({ message: 'Something went wrong!' });
      user.password = await passwordHash(newPassword);
      user.resetToken = null;
      user.expiredToken = null;
      await user.save();
      return res.status(200).send({ message: 'Password change successful!' });
    } catch (e) {
      console.log(e);
      return res.status(400).send({ message: 'Something went wrong!' });
    }
  },
};
