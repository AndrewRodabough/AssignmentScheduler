import express from 'express';

const router = express.Router();

export default function(dataStore) {
    
    router.delete('/', (req, res) => {
        // Remove event from user's calendar
    });

    return router;
};