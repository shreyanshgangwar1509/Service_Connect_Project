import jwt from 'jsonwebtoken';
import { Booking } from '../models/booking.model.js';
export const IsBooked = async (req, res, next) => {
  try {
    const worker = req.params.workerid;

    // Check if there's an active booking between the worker and the user
    const booking = await Booking.findOne({
      workerId: worker,
      userId: req.user,
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
export const isAuthenticated = async (req, res, next) => {
    try {
        // Access the token from cookies
        // const token = req.cookies['access-token']; // Accessing token from request cookies
      // const {token} = req.body;
      // console.log(req.body);
      
      //   console.log('cookie 1 ', token)
      //   if (!token) {
      //       return res.status(401).json({ message: "You are not logged in." });
      //   }
      const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token after "Bearer"
    console.log('auth  ',token);
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
      const decodedData = jwt.verify(token, process.env.JWT_SECERET);
      console.log(decodedData);
      
        req.userId = decodedData.userId;
        req.role = decodedData.role;
        console.log(req.role);
        
        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        // Respond with an error if any issue occurs
        console.error("Error in authentication middleware:", error);
        return res.status(500).json({ message: "Error in checking authentication" });
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