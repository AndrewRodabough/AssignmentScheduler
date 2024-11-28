import express from 'express';
import { tokenValidation } from '../../middleware/jsonValidation.js';
import { UserController } from '../../controllers/userController.js';
import { validationResult } from 'express-validator';

const router = express.Router();

export default function(dataStore) {

    const userController = new UserController(dataStore);

    router.delete('/', async (req, res) => {
        
        // check for req errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        // Invalidate user session
        try {

            const token = req.headers.authorization;

            console.log(token);
            const result = await userController.logout(token);
            console.log("did it")
            return res.status(200).json({message: "success"});

        } catch (error) {

            return res.status(500).json({ error: error.message });
        }
    });

    return router;
};