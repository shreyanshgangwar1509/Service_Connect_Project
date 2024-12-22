import { Booking } from '../models/booking.model.js';

export const IsBooked = async (req, res, next) => {
  try {
    const { userId } = req.body;

    // Check if there's an active booking between the worker and the user
    const booking = await Booking.findOne({
      workerId: req.user,
      userId: userId,
      status: 'ongoing',
    });

    if (!booking) {
      return res.status(403).json({ message: 'No active booking found with this user' });
    }

    // If a booking exists, proceed to the next middleware or function
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const isAuthenticated = async (req,res,next) => {
     try {
        const token = res.cookie['access-token'];
        if (!token) {
            res.status(500).json({ message: "you are not Logged in " });
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECERET);
       req.user = decodedData._id;
       req.role = decodedData.role;
         next();
    } catch (error) {
        res.status(500).json({ message: "Error in checking " });
        
    }
}

export const isAdmin = async (req,res,next) => {
     try {
        const token = res.cookie['admin-token'];
        if (!token) {
            res.status(500).json({ message: "Only admin can access this route" });
        }
        const seceretKey = jwt.verify(token, process.env.ADMIN_SECERET_KEYS);
        const adminSeceretKey = process.env.ADMIN_SECERET_KEYS|| "Shrey";
         const isMatch = seceretKey === adminSeceretKey;
         if (!isMatch) {
            return res.status(400).json({ message: "Invalid admin key" });
        }
         next();
    } catch (error) {
        res.status(500).json({ message: "Error in checking " });
        
    }
}