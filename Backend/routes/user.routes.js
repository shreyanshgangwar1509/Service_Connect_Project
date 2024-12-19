import express from 'express';
import {
  cancelBooking,
  chatWithWorker,
  deleteUserAccount,
  getPastBookings,
  getUserBookings,
  getUserProfile,
  submitReviewToWorker,
} from '../controllers/user.controller';
import { isAuthenticated } from '../middleware/auth.middleware';
import { IsBooked } from '../middleware/booking.middleware';

const router = express.Router();

// Protect all routes with authentication
router.use(isAuthenticated);
router.get('/me', getUserProfile);
router.post('/book', createBooking);             // Create a new booking
router.get('/myBookings', getUserBookings);      // Get user's current bookings
 // Get worker's current bookings
router.post('/cancelBooking', cancelBooking);    // Cancel a booking
router.post('/completeBooking', completeBooking);// Mark a booking as completed
router.post('/markAsPaid', markBookingAsPaid); 
router.get('/pastBookings', getPastBookings);
router.post('/cancelBooking', cancelBooking);
router.post('/reviewToWorker', submitReviewToWorker);
router.post('/chat', IsBooked, chatWithWorker);
router.delete('/delete', deleteUserAccount);

export default router;
