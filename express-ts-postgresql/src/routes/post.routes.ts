import express from 'express';
import { PostController } from '../controllers/post.controller';
//routes are private
export default (router: express.Router) => {
  router.get('/posts', PostController.index);
  router.get('/posts/:id', PostController.show);
  router.post('/posts', PostController.store);
};
