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
            const token = req.headers.authorization?.split(' ')[1];
            const { calendarName } = req.body;
            const result = await calendarController.delete(token, calendarName);
            res.status(200).json(result)
        } catch (error) {

            if (error.message === 'Calendar Does Not Exists') {
            
            }
            if (error.message === 'Not Authorized to Delete') {
            
            }

            res.status(500).json({ error: error.message });
        }
    });

    return router;
};