import express from 'express';
import { verifyUserToken } from '../middlewares/authenticate';
import { FollowController } from '../controllers/follow.controller';

export default (router: express.Router) => {
  router.post('/followings', FollowController.follow);
  router.delete('/followings/:id', FollowController.unfollow);
  router.get('/followings', FollowController.index);
};
