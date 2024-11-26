import express from 'express';

const router = express.Router();

export default function(dataStore) {

    router.delete('/', (req, res) => {

        // check for req errors
        const errors = validationResults(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        
        }
    
        // Modify specific event details
    });

    return router;
};