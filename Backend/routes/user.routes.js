import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware';
import {
  getUserProfile,
  getUserBookings,
  getPastBookings,
  submitReviewToWorker,
  chatWithWorker,
  cancelBooking,
  deleteUserAccount,
} from '../controllers/user.controller';
import { IsBooked } from '../middleware/booking.middleware';

const router = express.Router();

// Protect all routes with authentication
router.use(isAuthenticated);
router.get('/me', getUserProfile);
router.get('/bookings', getUserBookings);
router.get('/pastBookings', getPastBookings);
router.post('/cancelBooking', cancelBooking);
router.post('/reviewToWorker', submitReviewToWorker);
router.post('/chat', IsBooked, chatWithWorker);
router.delete('/delete', deleteUserAccount);

export default router;
