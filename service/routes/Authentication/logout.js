import express from 'express';
const router = express.Router();

// User logout
router.delete('/', (req, res) => {
    // Invalidate user session
});

export { router };