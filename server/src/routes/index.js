import express from 'express';
import userRoutes from './userRoutes.js';
import taskRoutes from './taskRoutes.js';

const router = express.Router();

router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// mount routes
router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);

export default router;
