import express from 'express';

const router = express.Router();

export default function(dataStore) {
    
    router.get('/', (req, res) => {
        // Retrieve events for authenticated user
    });

    return router;
};