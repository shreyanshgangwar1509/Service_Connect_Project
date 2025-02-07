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
    console.log(req.userId);
    
    const bookings = await Booking.find({ workerId: req.userId, status: 'completed' });
    console.log('past booking ',bookings);
    
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
const getAllProviders = async (req, res) => {
  try {
      console.log('getting all providers');
      
        const { service } = req.params; // Service from URL params
        const { longitude, latitude } = req.query; // Coordinates from query params

        if (!longitude || !latitude) {
            return res.status(400).json({ error: "Longitude and latitude are required." });
        }
        const lng = parseFloat(longitude );
        const lat = parseFloat(latitude );

        const workers = await Worker.find({
            services: service,
            available: true,
        })
        .near('location', {
            center: { type: 'Point', coordinates: [lng, lat] },
            maxDistance: 40000,
        })
    const modifiedWorkers = workers.map(({ name, _id, services, rating, avatar }) => {
      const serviceDetails = services.find(s => s.name === service); // Adjust based on your schema
      return {
        id: _id,
        name,
        rating,
        avatar: avatar?.url || null,
        charges: serviceDetails ? serviceDetails.charges : null,
      };
    });
        if (!workers.length) {
            return res.status(404).json({ message: "No providers found for the given service and location." });
    }
    if (!Array.isArray(workers)) {
      return res.status(500).json({ error: "Invalid data format. Expected an array." });
    }

        // Send response
        res.status(200).json({
            success: true,
            data: modifiedWorkers,
        });
    } catch (error) {
        console.error("Error fetching providers:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const getallRatings = async (req, res) => {
  try {
    const workerid = req.user; 
    const worker = await Worker.findById(workerid, "review"); 

    const ratingarray = Array(5).fill(0); 

    worker.review.forEach((review) => {
      const star = review.star;  
      
      if (star >= 0 && star < 5) {
        ratingarray[star]++;  
      }
    });

    res.status(200).json({ message: "Successfully fetched ratings", ratingarray });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching ratings", error: error.message });
  }
};

const getBookingDetailsBout = async (req, res) => {
  try {
    const workerId = req.user; // Assuming workerId is stored in req.user

    const allbooking = await Booking.find({ workerId }, "status");

    const bookingdetails = Array(3).fill(0);

    allbooking.forEach((booking) => {
      if (booking.status === 'ongoing') {
        bookingdetails[0]++;
      } else if (booking.status === 'completed') {
        bookingdetails[1]++;
      } else if (booking.status === 'cancelled') {
        bookingdetails[2]++;
      }
    });

    res.status(200).json({
      message: "Successfully fetched booking details",
      bookingdetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch booking details",
      error: error.message,
    });
  }
};

export default {getBookingDetailsBout, getallRatings,getAllProviders,getWorkerBookings,workerProfile,CurrentBooking,PastBookings,WorkerPortfolio,AddOnCostOfMaterial,ChatWithUser, DeleteMyAccount,updateWorkerLocation,getWorkerBookings,getWorkerLocation };
