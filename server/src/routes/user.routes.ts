import express from 'express';
import { verifyUserToken } from '../middlewares/authenticate';
import { UsersController } from '../controllers/user.controller';
//routes are private
export default (router: express.Router) => {
  router
    .get('/users', verifyUserToken, UsersController.index)
    .get('/users/:id', UsersController.show)
    .post('/users/:id', UsersController.show)
    .delete('/users/:id', verifyUserToken, UsersController.delete)
    .put('/users/:id', verifyUserToken, UsersController.update);
};
