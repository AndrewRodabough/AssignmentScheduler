import express from 'express';
import { tokenValidation } from '../middleware/jsonValidation.js';
import { CalendarController } from '../../controllers/calendarController.js';

const router = express.Router();

export default function(dataStore) {

    const calendarController = new CalendarController(dataStore);

    router.delete('/', tokenValidation, async (req, res) => {

        // check for req errors
        const errors = validationResults(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        
        }
    
        // delete a users calendar
        try {
            await calendarController.delete(req, res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
};