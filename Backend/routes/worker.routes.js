import express from 'express';
import { getWorkerLocation, updateWorkerLocation } from '../controllers/workerLocation.controller';
import { isAuthenticated } from '../middleware/auth.middleware';

const router = express.Router();

// Update worker's location (protected route)
router.put('/updateLocation', isAuthenticated, updateWorkerLocation);

// Get worker's location by worker ID
router.get('/location/:id', getWorkerLocation);

export default router;
