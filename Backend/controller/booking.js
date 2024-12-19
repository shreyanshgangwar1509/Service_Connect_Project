import Booking from '../models/Booking';

/**
 * Create a new booking.
 */
export const createBooking = async (req, res) => {
  try {
    const { workerId, service, date, time, cost } = req.body;

    const booking = new Booking({
      userId: req.user.id,
      workerId,
      service,
      date,
      time,
      cost,
      status: 'ongoing',
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * Get all current bookings for the user.
 */
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id, status: 'ongoing' });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * Get all current bookings for the worker.
 */
export const getWorkerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ workerId: req.user.id, status: 'ongoing' });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * Cancel a booking.
 */
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId, reason } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = 'cancelled';
    booking.cancellationReason = reason;
    await booking.save();

    res.status(200).json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
/**
 * Mark a booking as completed if payment is verified.
 */
export const completeBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.paymentStatus !== 'paid') {
      return res.status(400).json({ message: 'Payment is pending. Cannot complete the booking.' });
    }

    booking.status = 'completed';
    await booking.save();

    res.status(200).json({ message: 'Booking marked as completed', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
