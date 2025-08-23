import express from 'express';
import { UserController } from '../controllers/userController.js';
import { userValidation, tokenValidation } from '../middleware/jsonValidation.js';
import { validationResult } from 'express-validator';

export default function authRoutes(dataStore) {
  const router = express.Router();
  const userController = new UserController(dataStore);

  router.post('/create', userValidation, (req, res) => userController.createUser(req, res));
  router.post('/login', userValidation, (req, res) => userController.login(req, res));
  router.delete('/logout', tokenValidation, (req, res) => userController.logout(req, res));

  return router;
}
