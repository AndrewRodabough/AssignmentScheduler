import express from 'express';
import { tokenValidation } from '../middleware/jsonValidation.js';
import { UserController } from '../../controllers/userController.js';

const router = express.Router();

export default function(dataStore) {

    const userController = new UserController(dataStore);

    router.delete('/', tokenValidation , async (req, res) => {
        
        // check for req errors
        const errors = validationResults(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        
        }
        
        // Invalidate user session
        try {
            await userController.logout(req, res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
};