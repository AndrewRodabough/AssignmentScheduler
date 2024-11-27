import express from 'express';
import { tokenValidation } from '../../middleware/jsonValidation.js';
import { EventController } from '../../controllers/eventController.js';
import { validationResult } from 'express-validator';

const router = express.Router();

export default function(dataStore) {
    
    const eventController = new EventController(dataStore);

    router.put('/', tokenValidation, async (req, res) => {
        
        // check for req errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        // Modify specific event details
        try {

            const token = req.headers.authorization?.split(' ')[1];
            const { event } = req.body;
            const result = await eventController.update(token, event);

            return res.status(200).json(result)

        } catch (error) {

            if (error.message === 'Event Does Not Exists') {
            
            }
            if (error.message === 'Not Authorized to Update') {
            
            }

            return res.status(500).json({ error: error.message });
        }
    });

    return router;
};