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

        // create user
        try {

            console.log("\n\nR: createUser");
            const { username, password } = req.body;
            const result = await userController.createUser(username, password);

            return res.status(200).json({ message: "Success" });

        } catch (error) {

            console.log(error)

            if (error.message === 'Username Taken') {
                return res.status(401).json({ error: error.message });
            }
            
            return res.status(500).json({ error: error.message });
        }
    });

    return router;
};