import express from 'express';
import { LikeController } from '../controllers/like.controller';
import { verifyUserToken } from '../middlewares/authenticate';
import { validator } from '../middlewares/validator';
import { LIKE_SCHEMA } from '../types/like.types';

export default (router: express.Router) => {
  router.post(
    '/likes',
    verifyUserToken,
    validator(LIKE_SCHEMA),
    LikeController.like
  );
  router.delete('/likes/:id', verifyUserToken, LikeController.unlike);
};
