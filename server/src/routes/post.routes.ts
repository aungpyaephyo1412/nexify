import express from 'express';
import { isOwner, verifyUserToken } from '../middlewares/authenticate';
import { PostsController } from '../controllers/post.controller';
//routes are private
export default (router: express.Router) => {
  router.post('/posts', PostsController.store);
  router.get('/posts', PostsController.index);
  router.get('/posts/:id', PostsController.show);
  router.delete('/posts/:id', verifyUserToken, isOwner, PostsController.delete);
  router.put('/posts/:id', verifyUserToken, isOwner, PostsController.update);
};
