import express from 'express';
import { CalendarController } from '../controllers/calendarController.js';
import { tokenValidation } from '../middleware/jsonValidation.js';

export default function calendarRoutes(dataStore) {
  const router = express.Router();
  const calendarController = new CalendarController(dataStore);

  router.post('/create', tokenValidation, (req, res) => calendarController.create(req, res));
  router.delete('/delete', tokenValidation, (req, res) => calendarController.delete(req, res));
  router.get('/getAll', tokenValidation, (req, res) => calendarController.getAll(req, res));
  router.put('/update', tokenValidation, (req, res) => calendarController.update(req, res));
  router.put('/share', tokenValidation, (req, res) => calendarController.share(req, res));

  return router;
}
