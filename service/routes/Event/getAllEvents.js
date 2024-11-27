import express from 'express';
import { tokenValidation } from '../middleware/jsonValidation.js';
import { EventController } from '../../controllers/eventController.js';

const router = express.Router();

export default function(dataStore) {
    
    const eventController = new EventController(dataStore);

    router.get('/', tokenValidation, async (req, res) => {
        
        // check for req errors
        const errors = validationResults(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        // Retrieve events for authenticated user
        try {

            const token = req.headers.authorization?.split(' ')[1];
            const { calendarId } = req.body;
            const result = await eventController.getAll(token, calendarId);
            
            return res.status(200).json(result);

        } catch (error) {

            return res.status(500).json({ error: error.message });
        }
    });

    return router;
};