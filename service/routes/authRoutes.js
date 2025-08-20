import express from 'express';
import { AuthController } from '../controllers/authController.js';
import { userValidation, tokenValidation } from '../middleware/jsonValidation.js';
import { validationResult } from 'express-validator';

export default function authRoutes(dataStore) {
  const router = express.Router();
  const authController = new AuthController(dataStore);

  router.post('/create', userValidation, (req, res) => authController.createUser(req, res));
  router.post('/login', userValidation, (req, res) => authController.login(req, res));
  router.delete('/logout', tokenValidation, (req, res) => authController.logout(req, res));

  return router;
}
