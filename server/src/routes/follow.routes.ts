import express from 'express';
import { verifyUserToken } from '../middlewares/authenticate';
import { FollowController } from '../controllers/follow.controller';
import { validator } from '../middlewares/validator';
import { FOLLOW_SCHEMA } from '../types/follow.types';

export default (router: express.Router) => {
  router.post(
    '/followings',
    verifyUserToken,
    validator(FOLLOW_SCHEMA),
    FollowController.follow
  );
  router.delete('/followings/:id', verifyUserToken, FollowController.unfollow);
  router.get('/followings', verifyUserToken, FollowController.index);
};
