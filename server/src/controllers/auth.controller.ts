import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createJwt, passwordHash, prisma, tryCatch } from '../utils';
import { message, transporter, verify_registerMessage } from '../utils/mail';
import { generateNumberToken } from '../helpers';
import {
  CREATE_USER_TYPE,
  LOGIN_USER_TYPE,
  RESEND_OTP_TYPE,
  RESET_PASSWORD_TYPE,
  VERIFY_USER_TYPE,
} from '../types/user.types';
import { findUserByEmail, LOGIN_USER_DTO } from '../helpers/user.helper';

export const AuthController = {
  async register(req: Request, res: Response) {
    await tryCatch(async () => {
      const { email, password }: CREATE_USER_TYPE = req.body;
      const hashPassword = await passwordHash(password);
      const rememberToken = generateNumberToken(1000, 9999);
      await prisma.user.create({
        data: {
          ...req.body,
          password: hashPassword,
          rememberToken,
        },
      });
      await transporter.sendMail(
        verify_registerMessage(rememberToken, [email])
      );
      return res
        .status(200)
        .send({ message: 'Registration successful,Check your email' });
    }, res);
  },

  async verify(req: Request, res: Response) {
    await tryCatch(async () => {
      const { email, token }: VERIFY_USER_TYPE = req.body;
      const user = await findUserByEmail(email);
      if (!user) return res.status(404).json({ message: 'User not found!' });
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
    }, res);
  },

  async resendOTP(req: Request, res: Response) {
    const { email }: RESEND_OTP_TYPE = req.body;
    await tryCatch(async () => {
      const user = await findUserByEmail(email);
      if (!user) return res.status(404).json({ message: 'user not found' });
      if (!user.rememberToken)
        return res.status(404).json({ message: 'Already verify' });
      await transporter.sendMail(
        verify_registerMessage(user.rememberToken, [email])
      );
      return res
        .status(200)
        .send({ message: 'Otp send again,Check your email' });
    }, res);
  },

  async checkResetToken(req: Request, res: Response) {
    await tryCatch(async () => {
      const { token } = req.params;
      const user = await prisma.user.findFirst({
        where: {
          AND: [
            {
              resetToken: {
                equals: token,
              },
            },
            {
              expiredToken: {
                gte: new Date(Date.now()),
              },
            },
          ],
        },
      });
      if (!user)
        return res.status(404).json({ message: 'Something went wrong!' });
      return res.status(200).send({ message: 'Valid token!' });
    }, res);
  },

  async login(req: Request, res: Response) {
    const { email, password }: LOGIN_USER_TYPE = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
      select: LOGIN_USER_DTO,
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
    await tryCatch(async () => {
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
          expiredToken: new Date(Date.now() + 60 * 60 * 1000),
        },
      });
      return res.status(201).json({
        message: 'Email sent',
      });
    }, res);
  },

  async resetPassword(req: Request, res: Response) {
    await tryCatch(async () => {
      const { email, token, newPassword }: RESET_PASSWORD_TYPE = req.body;
      const user = await prisma.user.findFirst({
        where: {
          AND: [
            {
              email: {
                equals: email,
              },
            },
            {
              resetToken: {
                equals: token,
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
          message: 'Something went wrong!',
        });
      }
      const password = await passwordHash(newPassword);
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          resetToken: null,
          expiredToken: null,
          password,
        },
      });
      return res.status(200).json({
        message: 'Password updated',
      });
    }, res);
  },
};
