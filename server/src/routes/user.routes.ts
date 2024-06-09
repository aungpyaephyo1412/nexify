import express from 'express';
import { isOwner, verifyUserToken } from '../middlewares/authenticate';
import { UsersController } from '../controllers/user.controller';
//routes are private
export default (router: express.Router) => {
  router.get('/users', UsersController.index);
  router.get('/users/:id', verifyUserToken, UsersController.show);
  router.delete('/users/:id', verifyUserToken, isOwner, UsersController.delete);
  router.put('/users/:id', verifyUserToken, isOwner, UsersController.update);
};
