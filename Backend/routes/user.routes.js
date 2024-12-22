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
import { isAuthenticated, IsBooked } from '../middlewares/auth.js';


const router = express.Router();

// Protect all routes with authentication
router.use(isAuthenticated);
router.get('/me', getUserProfile);
router.post('/book/:service/:workerid', createBooking);             // Create a new booking
router.get('/myBookings', getUserBookings);      // Get user's current bookings
 // Get worker's current bookings
router.post('/cancelBooking/:bookingid', cancelBooking);    // Cancel a booking
router.post('/completeBooking/:bookingid', completeBooking);// Mark a booking as completed
router.post('/markAsPaid/:bookingid', markBookingAsPaid); 
router.get('/pastBookings', getPastBookings);
router.post('/reviewToWorker/:bookingid', submitReviewToWorker);
router.post('/chat/:workerid', IsBooked, chatWithWorker);
router.delete('/delete', deleteUserAccount);

export default router;
