import express from 'express';
import { tokenValidation } from '../middleware/jsonValidation.js';
import { CalendarController } from '../../controllers/calendarController.js';

const router = express.Router();

export default function(dataStore) {

    const calendarController = new CalendarController(dataStore);
  
    router.post('/', tokenValidation, async (req, res) => {
    
        // check for req errors
        const errors = validationResults(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        // create a calendar for a user
        try {
            await calendarController.create(req, res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
  
    return router;
};