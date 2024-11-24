import express from 'express';
import { validationResult } from 'express-validator';
import { userCreationValidation } from '../middleware/validation.js';
import { UserController } from '../../controllers/userController.js';

const router = express.Router();

export default function(dataStore) {
    
    const userController = new UserController(dataStore);

    router.post('/', userCreationValidation, async (req, res) => {
        
        // check for req errors
        const errors = validationResults(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        
        }

        try {
            await userController.createUser(req, res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    });

    return router;
};


export default function(users) {
    
    return router;
};