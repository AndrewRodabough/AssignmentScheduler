import express from 'express';
import { DevController } from '../controllers/devController.js';

const router = express.Router();

export default function(dataStore) {

    const devController = new DevController(dataStore);

    router.delete('/', async (req, res) => {

        try {

            await devController.clear();
            return res.status(200).json({ message: "success" });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
    
    return router;
};