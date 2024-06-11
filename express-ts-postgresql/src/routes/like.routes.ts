import express from 'express';
import { LikeController } from '../controllers/like.controller';

export default (router: express.Router) => {
  router.post('/likes', LikeController.like);
  router.delete('/likes/:id', LikeController.unlike);
};
