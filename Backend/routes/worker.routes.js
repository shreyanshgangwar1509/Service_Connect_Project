import express from 'express';
import { getProfile } from '../controllers/user.js';
import worker from '../controllers/worker.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

// Middleware for authentication (if not globally applied)
router.use(isAuthenticated);

/**
 * Worker Profile Routes
 */
router.get('/profile', getProfile);
router.get('/portfolio', worker.WorkerPortfolio);
router.delete('/delete-account', worker.DeleteMyAccount);

/**
 * Booking Routes
 */
router.get('/bookings/current', worker.CurrentBooking);
router.get('/bookings/past', worker.PastBookings);
router.get('/bookings', worker.getWorkerBookings);
router.post('/bookings/add-material-cost', worker.AddOnCostOfMaterial);

/**
 * Chat Routes
 */
router.post('/chat/:userId', worker.ChatWithUser);

/**
 * Location Routes
 */
router.put('/location', worker.updateWorkerLocation);
router.get('/location/:id', worker.getWorkerLocation);

export default router;
