import { Router } from 'express';
import users from './user.routes';
import auth from './auth.routes';
import posts from './post.routes';


const router = Router();
export default (): Router => {
  auth(router);
  users(router);
  posts(router)
  return router;
};
