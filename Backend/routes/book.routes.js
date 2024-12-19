// import express from 'express';
// import { getMyprofile, login, logout, SignUp } from '../controllers/user';
// import { isAuthenticated } from '../middlewares/auth';
// import { singleAvatar } from '../middlewares/multer';

// const  router = express.Router();

// router.post('/service/book', BookService);
// router.get('/service/detail', isbooked, BookService);
// router.post('/service/cancel', BookService);





import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware';
import {
  createBooking,
  getUserBookings,
  getWorkerBookings,
  cancelBooking,
  completeBooking,
} from '../controllers/bookService.controller';

const router = express.Router();

// Protect all routes with authentication
router.use(isAuthenticated);

// Booking routes
router.post('/book', createBooking);             // Create a new booking
router.get('/myBookings', getUserBookings);      // Get user's current bookings
router.get('/workerBookings', getWorkerBookings); // Get worker's current bookings
router.post('/cancelBooking', cancelBooking);    // Cancel a booking
router.post('/completeBooking', completeBooking);// Mark a booking as completed
router.post('/markAsPaid', markBookingAsPaid); 
export default router;
