import express from 'express';
import { GroupController } from '../controllers/groupController.js';
import { tokenValidation } from '../middleware/jsonValidation.js';

export default function groupRoutes(dataStore) {
  const router = express.Router();
  const groupController = new GroupController(dataStore);

  router.post('/create', tokenValidation, (req, res) => groupController.create(req, res));
  router.delete('/delete', tokenValidation, (req, res) => groupController.delete(req, res));
  router.get('/getAll', tokenValidation, (req, res) => groupController.getAll(req, res));
  router.put('/update', tokenValidation, (req, res) => groupController.update(req, res));
  router.put('/share', tokenValidation, (req, res) => groupController.share(req, res));

  return router;
}
