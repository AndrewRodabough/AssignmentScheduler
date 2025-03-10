import express from 'express';
import { userValidation } from '../../middleware/jsonValidation.js';
import { UserController } from '../../controllers/userController.js';
import { validationResult } from 'express-validator';

const router = express.Router();

export default function(dataStore) {

    const userController = new UserController(dataStore);

    router.post('/', userValidation, async (req, res) => {

        // check for req errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Validate credentials, return token
        try {

            console.log("\n\nR: login");
            const { username, password } = req.body;
            const result = await userController.login(username, password);

            return res.status(200).json(result);

        } catch (error) {
            console.log(error);
            if (error.message === 'User not found' || error.message === 'Invalid credentials') {
                return res.status(401).json({ error: error.message });
            }
            
            return res.status(500).json({ error: error.message });
        }
    });
    
    return router;
};