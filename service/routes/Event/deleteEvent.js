import express from 'express';
import { tokenValidation } from '../../middleware/jsonValidation.js';
import { EventController } from '../../controllers/eventController.js';
import { validationResult } from 'express-validator';

const router = express.Router();

export default function(dataStore) {
    
    const eventController = new EventController(dataStore);

    router.delete('/', tokenValidation, async (req, res) => {
        
        // check for req errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        // Remove event from user's calendar
        try {

            console.log("\n\nR: deleteEvent");
            const token = req.headers.authorization?.split(' ')[1];
            const { eventId } = req.body;
            const result = await eventController.delete(token, eventId);

            return req.status(200).json({ message: "success" });

        } catch (error) {

            if (error.message === 'Event Does Not Exists') {
            
            }
            if (error.message === 'Not Authorized to Delete') {
            
            }

            return res.status(500).json({ error: error.message });
        }
    });

    return router;
};