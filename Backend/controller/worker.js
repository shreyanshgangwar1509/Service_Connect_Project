// Import necessary models (assuming Mongoose is used)
import Booking from '../models/Booking';
import Chat from '../models/Chat';
import Review from '../models/Review';
import Worker from '../models/Worker';

/**
 * Get the current worker profile.
 */
export const workerProfile = async (req, res) => {
  try {
    const worker = await Worker.findById(req.user.id);
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.status(200).json(worker);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * Get current bookings for the worker.
 */
export const CurrentBooking = async (req, res) => {
  try {
    const bookings = await Booking.find({ workerId: req.user.id, status: 'ongoing' });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * Get past bookings for the worker.
 */
export const PastBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ workerId: req.user.id, status: 'completed' });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * Get the worker's portfolio.
 */
export const WorkerPortfolio = async (req, res) => {
  try {
    const worker = await Worker.findById(req.user.id).select('portfolio');
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.status(200).json(worker.portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * Add the cost of additional materials for a booking.
 */
export const AddOnCostOfMaterial = async (req, res) => {
  try {
    const { bookingId, additionalCost } = req.body;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.additionalCost = additionalCost;
    await booking.save();

    res.status(200).json({ message: 'Additional cost added', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * Give a review to a company.
 */
export const GiveReview = async (req, res) => {
  try {
    const { companyId, rating, comment } = req.body;

    const review = new Review({
      reviewerId: req.user.id,
      companyId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: 'Review submitted successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * Give a review to a user.
 */
export const GiveReviewToUser = async (req, res) => {
  try {
    const { userId, rating, comment } = req.body;

    const review = new Review({
      reviewerId: req.user.id,
      userId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: 'Review submitted successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * Chat with a user (only if a booking exists).
 */
export const ChatWithUser = async (req, res) => {
  try {
    const { userId, message } = req.body;

    const chat = new Chat({
      workerId: req.user.id,
      userId,
      messages: [{ senderId: req.user.id, message }],
    });

    await chat.save();
    res.status(201).json({ message: 'Message sent successfully', chat });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * Cancel a booking with a reason and penalty.
 */
export const CancelBooking = async (req, res) => {
  try {
    const { bookingId, reason, penalty } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = 'cancelled';
    booking.cancellationReason = reason;
    booking.penalty = penalty;

    await booking.save();
    res.status(200).json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * Delete the worker's account.
 */
export const DeleteMyAccount = async (req, res) => {
  try {
    await Worker.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateWorkerLocation = async (req, res) => {
  try {
    const { longitude, latitude } = req.body;
    const workerId = req.user.id; // Assuming `req.user` contains the authenticated worker's ID

    const worker = await Worker.findById(workerId);

    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    worker.location.coordinates = [longitude, latitude];
    await worker.save();

    res.status(200).json({ message: 'Location updated successfully', location: worker.location });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * Get worker's current location.
 */
export const getWorkerLocation = async (req, res) => {
  try {
    const workerId = req.params.id; // Get worker ID from URL params

    const worker = await Worker.findById(workerId);

    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    res.status(200).json({ location: worker.location });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
