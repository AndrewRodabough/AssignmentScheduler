import express from 'express';
import { tokenValidation } from '../../middleware/jsonValidation.js';
import { CalendarController } from '../../controllers/calendarController.js';
import { validationResult } from 'express-validator';

const router = express.Router();

export default function(dataStore) {

    const calendarController = new CalendarController(dataStore);
  
    router.put('/', tokenValidation, async (req, res) => {

        // check for req errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // update a users calendar info
        try {

            const token = req.headers.authorization;
            const { shareUser, shareCalendar } = req.body;
            const result = await calendarController.share(token, shareUser, shareCalendar);

            res.status(200).json({ message: "success" })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
    
    return router;
};