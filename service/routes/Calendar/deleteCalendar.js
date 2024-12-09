import express from 'express';
import { tokenValidation } from '../../middleware/jsonValidation.js';
import { CalendarController } from '../../controllers/calendarController.js';
import { validationResult } from 'express-validator';

const router = express.Router();

export default function(dataStore) {

    const calendarController = new CalendarController(dataStore);

    router.delete('/', tokenValidation, async (req, res) => {

        // check for req errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        // delete a users calendar
        try {

            const token = req.headers.authorization;
            const { calendarId } = req.body;
            const result = await calendarController.delete(token, calendarId);
            
            return res.status(200).json({ message: "success" })

        } catch (error) {

            if (error.message === 'Calendar Does Not Exists') {
            
            }
            if (error.message === 'Not Authorized to Delete') {
            
            }

            return res.status(500).json({ error: error.message });
        }
    });

    return router;
};