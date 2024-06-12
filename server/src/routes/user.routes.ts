import express from 'express';
import { verifyUserToken } from '../middlewares/authenticate';
import { UsersController } from '../controllers/user.controller';
//routes are private
export default (router: express.Router) => {
  router.get('/users', UsersController.index);
  router.get('/users/:id', UsersController.show);
  router.delete('/users/:id', verifyUserToken, UsersController.delete);
  router.put('/users/:id', UsersController.update);
};
