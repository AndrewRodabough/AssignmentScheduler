import express from 'express';
import { EventController } from '../controllers/eventController.js';
import { tokenValidation } from '../middleware/jsonValidation.js';

export default function eventRoutes(dataStore) {
  const router = express.Router();
  const eventController = new EventController(dataStore);

  router.post('/create', tokenValidation, (req, res) => eventController.create(req, res));
  router.delete('/delete', tokenValidation, (req, res) => eventController.delete(req, res));
  router.get('/getAll', tokenValidation, (req, res) => eventController.getAll(req, res));
  router.put('/update', tokenValidation, (req, res) => eventController.update(req, res));

  return router;
}
