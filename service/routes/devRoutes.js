import express from 'express';
import { DevController } from '../controllers/devController.js';

export default function devRoutes(dataStore) {
  const router = express.Router();
  const devController = new DevController(dataStore);

  router.delete('/clear', (req, res) => devController.clear(req, res));

  return router;
}
