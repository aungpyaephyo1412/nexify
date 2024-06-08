import express from 'express';
import { validator } from '../middlewares/validator';
import {
  createUserSchema,
  forgotSchema,
  loginUserSchema,
  resetSchema,
  verifyUserSchema,
} from '../types/user.types';
import { AuthController } from '../controllers/auth.controller';
export default (router: express.Router) => {
  router.post(
    '/auth/register',
    validator(createUserSchema),
    AuthController.register
  );
  router.post('/auth/login', validator(loginUserSchema), AuthController.login);
  router.post(
    '/auth/verify',
    validator(verifyUserSchema),
    AuthController.verify
  );
  router.post(
    '/auth/forgot-password',
    validator(forgotSchema),
    AuthController.forgotPassword
  );
  router.post(
    '/auth/reset-password',
    validator(resetSchema),
    AuthController.resetPassword
  );
};
