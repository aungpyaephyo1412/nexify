import express from 'express';
import { CommentController } from '../controllers/comment.controller';
import { verifyUserToken } from '../middlewares/authenticate';
import { CREATE_COMMENT_SCHEMA } from '../types/post.types';
import { validator } from '../middlewares/validator';

export default (router: express.Router) => {
  router.get('/comments', verifyUserToken, CommentController.index);
  router.post(
    '/comments',
    verifyUserToken,
    validator(CREATE_COMMENT_SCHEMA),
    CommentController.store
  );
  router.delete('/comments/:id', verifyUserToken, CommentController.delete);
};
