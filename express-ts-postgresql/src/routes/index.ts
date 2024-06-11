import { Router } from 'express';
import users from './user.routes';
import auth from './auth.routes';
import posts from './post.routes';
import likes from './like.routes';
import comments from './comment.routes';

const router = Router();
export default (): Router => {
  auth(router);
  users(router);
  posts(router);
  likes(router);
  comments(router);
  return router;
};
