import express from 'express';

const router = express.Router();

export default function(dataStore) {
    
    router.post('/', (req, res) => {
        // Add new event to user's calendar
    });

    return router;
};