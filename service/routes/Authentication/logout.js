import express from 'express';
import { tokenValidation } from '../middleware/jsonValidation.js';
import { UserController } from '../../controllers/userController.js';

const router = express.Router();

export default function(dataStore) {

    const userController = new UserController(dataStore);

    router.delete('/', tokenValidation, async (req, res) => {
        
        // check for req errors
        const errors = validationResults(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        // Invalidate user session
        try {

            const token = req.headers.authorization?.split(' ')[1];
            const result = await userController.logout(token);

            return res.status(200).json(result);

        } catch (error) {

            return res.status(500).json({ error: error.message });
        }
    });

    return router;
};