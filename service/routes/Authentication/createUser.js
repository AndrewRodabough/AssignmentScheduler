import express from 'express';
import { body, validationResult } from 'express-validator';
import uuid from 'uuid';
const router = express.Router();

// Create new user account
router.post('/', userCreationValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    
    // 
});

export { router };