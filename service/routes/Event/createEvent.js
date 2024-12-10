import express from 'express';
import { tokenValidation } from '../../middleware/jsonValidation.js';
import { EventController } from '../../controllers/eventController.js';
import { validationResult } from 'express-validator';

const router = express.Router();

export default function(dataStore) {

    const eventController = new EventController(dataStore);
    
    router.post('/', tokenValidation, async (req, res) => {
        
        // check for req errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        // Add new event to user's calendar
        try {

            console.log("\n\nR: createEvent");
            const token = req.headers.authorization;
            const { event } = req.body;
            const result = await eventController.create(token, event);
            
            return res.status(200).json({ message: 'success' });
            
        } catch (error) {
            
            res.status(500).json({ error: error.message });
        }
    });

    return router;
};