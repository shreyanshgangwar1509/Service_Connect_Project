// Import necessary models (assuming Mongoose is used)
import { Booking } from '../models/booking.model.js';
import { Chat } from '../models/chat.model.js';
import { Worker } from '../models/worker.model.js';


/**
 * Get the current worker profile.
 */
const workerProfile = async (req, res) => {
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
const CurrentBooking = async (req, res) => {
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
const PastBookings = async (req, res) => {
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
const WorkerPortfolio = async (req, res) => {
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
const AddOnCostOfMaterial = async (req, res) => {
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

const ChatWithUser = async (req, res) => {
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
// export const CancelBooking = async (req, res) => {
//   try {
//     const { bookingId, reason, penalty } = req.body;

//     const booking = await Booking.findById(bookingId);

//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }

//     booking.status = 'cancelled';
//     booking.cancellationReason = reason;
//     booking.penalty = penalty;

//     await booking.save();
//     res.status(200).json({ message: 'Booking cancelled successfully', booking });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

/**
 * Delete the worker's account.
 */
 const DeleteMyAccount = async (req, res) => {
  try {
    await Worker.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const updateWorkerLocation = async (req, res) => {
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
const getWorkerLocation = async (req, res) => {
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
const getWorkerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ workerId: req.user.id, status: 'ongoing' });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
export default { getWorkerBookings,workerProfile,CurrentBooking,PastBookings,WorkerPortfolio,AddOnCostOfMaterial,ChatWithUser, DeleteMyAccount,updateWorkerLocation,getWorkerBookings,getWorkerLocation };
