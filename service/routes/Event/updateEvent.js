import express from 'express';

const router = express.Router();

export default function(dataStore) {
    
    router.put('/', (req, res) => {
        // Modify specific event details
    });

    return router;
};