import { Booking } from '../models/booking.model.js';
import { Chat } from '../models/chat.model.js';
import { Message } from '../models/message.model.js';
import { Worker } from '../models/worker.model.js';

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

const CurrentBooking = async (req, res) => {
  try {
    const bookings = await Booking.find({ workerId: req.user, status: 'ongoing' });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const PastBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ workerId: req.user.id, status: 'completed' });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const WorkerPortfolio = async (req, res) => {
  try {
    const worker = await Worker.findById(req.user).select('portfolio');
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.status(200).json(worker.portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

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
        const { message } = req.body;
      const workerId = req.user;
      const userId = req.params.userId;
        // Validate required fields
        if (!userId || !workerId || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'userId, workerId, and message are required' 
            });
        }
        console.log('Hello ');
        
        // Find an existing chat between user and worker
        let chat = await Chat.findOne({ userId, workerId });

        // If no chat exists, create a new one
        if (!chat) {
            chat = await Chat.create({ userId, workerId, messages: [] });
        }

        // Add the new message to the chat
        const newMessage = await Message.create({
            senderId: userId,
            receiverId: workerId,
            message,
        });

        chat.messages.push(newMessage._id);
        await chat.save();

        return res.status(200).json({
            success: true,
            message: 'Message sent successfully',
            data: newMessage,
        });
    } catch (error) {
        console.error('Error in chatWithWorker:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};


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
    const workerId = req.user; // Assuming `req.user` contains the authenticated worker's ID

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
export const getWorkerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ workerId: req.user.id, status: 'ongoing' });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
export default { getWorkerBookings,workerProfile,CurrentBooking,PastBookings,WorkerPortfolio,AddOnCostOfMaterial,ChatWithUser, DeleteMyAccount,updateWorkerLocation,getWorkerBookings,getWorkerLocation };
