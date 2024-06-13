import express from 'express';
import { PostController } from '../controllers/post.controller';
import { POST_CREATE_SCHEMA } from '../types/post.types';
import { validator } from '../middlewares/validator';
import { verifyUserToken } from '../middlewares/authenticate';
//routes are private
export default (router: express.Router) => {
  router
    .get('/posts', verifyUserToken, PostController.index)
    .get('/posts/:id', verifyUserToken, PostController.show)
    .delete('/posts/:id', verifyUserToken, PostController.delete)
    .post(
      '/posts',
      verifyUserToken,
      validator(POST_CREATE_SCHEMA),
      PostController.store
    );
};
