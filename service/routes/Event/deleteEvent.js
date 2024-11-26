import express from 'express';
import { tokenValidation } from '../middleware/jsonValidation.js';
import { EventController } from '../../controllers/eventController.js';

const router = express.Router();

export default function(dataStore) {
    
    const eventController = new EventController(dataStore);

    router.delete('/', tokenValidation, async (req, res) => {
        
        // check for req errors
        const errors = validationResults(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        
        }
        
        // Remove event from user's calendar
        try {
            await eventController.delete(req, res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
};