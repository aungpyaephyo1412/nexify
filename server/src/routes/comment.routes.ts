import express from 'express';
import { CommentController } from '../controllers/comment.controller';
import { verifyUserToken } from '../middlewares/authenticate';

export default (router: express.Router) => {
  router.get('/comments', verifyUserToken, CommentController.index);
  router.post('/comments', verifyUserToken, CommentController.store);
  router.delete('/comments/:id', verifyUserToken, CommentController.delete);
};
