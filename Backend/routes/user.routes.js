import express from 'express';
import {
  chatWithWorker,
  deleteUserAccount,
  getPastBookings,
  getProfile,
  getRecommendations,
  getUserBookings,
  handleVoiceBooking,
  markBookingAsPaid,
  submitReviewToWorker
} from '../controllers/user.js';

import { cancelBooking, completeBooking, createBooking } from '../controllers/booking.js';
import { isAuthenticated, IsBooked } from '../middlewares/auth.js';


const router = express.Router();

// Protect all routes with authentication
router.use(isAuthenticated);
router.get('/me', getProfile);
router.post('/book', handleVoiceBooking);
router.post('/book/:service/:workerid', createBooking);             // Create a new booking
router.get('/myBookings', getUserBookings);      // Get user's current bookings
 // Get worker's current bookings
router.post('/cancelBooking/:bookingid', cancelBooking);   
router.post('/completeBooking/:bookingid', completeBooking);
router.post('/markAsPaid/:bookingid', markBookingAsPaid); 
router.get('/pastBookings', getPastBookings);
router.post('/reviewToWorker/:bookingid', submitReviewToWorker);
router.post('/chat/:workerid', IsBooked, chatWithWorker);
router.delete('/delete', deleteUserAccount);
router.post('/recommendations', getRecommendations);
export default router;
