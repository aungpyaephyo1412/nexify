import { pagination } from 'prisma-extension-pagination';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import express from 'express';
export const createJwt = (payload: object) => {
  return jwt.sign(payload, process.env['TOKEN_SECRET'] as string, {
    expiresIn: '30 days',
  });
};
export const passwordHash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
export const apiVersion = (): string => `v${process.env['API_VERSION'] || 1}`;

export const prisma = new PrismaClient().$extends(pagination());
export const isEmptyObj = (obj: object) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

export const tryCatch = async (
  fn: () => Promise<express.Response>,
  res: express.Response
) => {
  try {
    return await fn();
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ message: 'Something went wrong!', errors: e });
  }
};
