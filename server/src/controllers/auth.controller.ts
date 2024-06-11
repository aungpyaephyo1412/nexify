import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createJwt, passwordHash, prisma } from '../utils';
import { faker, tr } from '@faker-js/faker';
import { message, transporter, verify_registerMessage } from '../utils/mail';

export const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const hashPassword = await passwordHash(req.body.password);
      const rememberToken = faker.number
        .int({ min: 100000000, max: 999999999 })
        .toString();
      await prisma.user.create({
        data: {
          ...req.body,
          password: hashPassword,
          rememberToken,
        },
      });
      console.log('email');
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
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) return res.status(404).json({ error: 'User not found!' });
      if (user.rememberToken !== token)
        return res.status(400).json({ error: 'Invalid token!' });
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          isVerified: true,
          rememberToken: null,
        },
      });
      return res.status(200).send({ message: 'Email verified successful!' });
    } catch (e) {
      console.log(e);
      return res.status(400).send({ message: 'Something went wrong!' });
    }
  },
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        bio: true,
        isVerified: true,
        email: true,
        name: true,
        username: true,
        profilePicture: true,
        gender: true,
        isAdmin: true,
        isBlocked: true,
        dateOfBirth: true,
        createdAt: true,
        password: true,
      },
    });
    if (!user)
      return res.status(400).send({ message: 'Something went wrong!' });
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
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) return res.status(400).send({ message: 'User not found' });
      const token = crypto.randomUUID().toString();
      await transporter.sendMail(message(token, [user.email], user.name));
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          resetToken: token,
          expiredToken: new Date(Date.now() + 60 * 60 * 10),
        },
      });
      return res.status(201).json({
        message: 'Email sent',
      });
    } catch (e) {
      console.log(e);
      return res.status(400).send({ message: 'Something went wrong!' });
    }
  },
  async resetPassword(req: Request, res: Response) {
    try {
      const newPassword = req.body.password;
      const sentToken = req.body.token;
      const user = await prisma.user.findFirst({
        where: {
          AND: [
            {
              resetToken: {
                equals: sentToken.toString(),
              },
            },
            {
              expiredToken: {
                gt: new Date(Date.now()),
              },
            },
          ],
        },
      });
      if (!user) {
        return res.status(400).json({
          error: 'User not found',
        });
      }
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          resetToken: null,
          expiredToken: null,
          password: await passwordHash(newPassword),
        },
      });
      return res.status(200).json({
        message: 'Password updated',
      });
    } catch (e) {
      console.log(e);
      return res.status(400).send({ message: 'Something went wrong!' });
    }
  },
};
