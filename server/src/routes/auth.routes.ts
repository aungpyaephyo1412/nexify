import { Router } from 'express';
import { validator } from '../middlewares/validator';
import {
  CREATE_USER_SCHEMA,
  FORGOT_PASSWORD_SCHEMA,
  LOGIN_USER_SCHEMA,
  RESEND_OTP_SCHEMA,
  RESET_PASSWORD_SCHEMA,
  VERIFY_USER_SCHEMA,
} from '../types/user.types';
import { AuthController } from '../controllers/auth.controller';
export default (router: Router) => {
  router
    .post(
      '/auth/register',
      validator(CREATE_USER_SCHEMA),
      AuthController.register
    )
    .post('/auth/login', validator(LOGIN_USER_SCHEMA), AuthController.login)
    .post('/auth/verify', validator(VERIFY_USER_SCHEMA), AuthController.verify)
    .post(
      '/auth/resend-otp',
      validator(RESEND_OTP_SCHEMA),
      AuthController.resendOTP
    )
    .get('/auth/verify/:token', AuthController.checkResetToken)
    .post(
      '/auth/forgot-password',
      validator(FORGOT_PASSWORD_SCHEMA),
      AuthController.forgotPassword
    )
    .post(
      '/auth/reset-password',
      validator(RESET_PASSWORD_SCHEMA),
      AuthController.resetPassword
    );
};
