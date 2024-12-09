import express from 'express';
import { tokenValidation } from '../../middleware/jsonValidation.js';
import { CalendarController } from '../../controllers/calendarController.js';
import { validationResult } from 'express-validator';

const router = express.Router();

export default function(dataStore) {

    const calendarController = new CalendarController(dataStore);
  
    router.post('/', tokenValidation, async (req, res) => {
    
        // check for req errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        console.log("valid cal request recieved");

        // create a calendar for a user
        try {

            const token = req.headers.authorization;
            const { calendarName } = req.body;
            const result = await calendarController.create(token, calendarName);

            return res.status(200).json({ message: "success" })
            
        } catch (error) {

            if (error.message === 'Calendar Name Already Exists') {
            
            }

            return res.status(500).json({ error: error.message });
        }
    });
  
    return router;
};