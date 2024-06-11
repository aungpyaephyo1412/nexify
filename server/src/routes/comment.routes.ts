import express from 'express';
import { CommentController } from '../controllers/comment.controller';

export default (router: express.Router) => {
  router.get('/comments', CommentController.index);
  router.post('/comments', CommentController.store);
};
