import { NEW_REQUEST, REFETCH_CHATS } from "../constants/Events.js";
import { getOtherMemeber } from "../lib/helper.js";
import { Chat } from "../models/chat.model.js";
import { Requset } from "../models/reuest.model.js";
import { User } from "../models/user.model.js";
import emitEvent from "../utills/emitEvent.js";

import VerificationToken from '../models/VerificationToken.js';
import sendverificationemail from '../utills/send-otp.js';
// auth.controller.js
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { setToken } from '../utills/token.js';
// Initialize OAuth2Client with your Google Client ID
import dotenv from 'dotenv';
import { Booking } from "../models/booking.model.js";
import { Message } from "../models/message.model.js";
import { Worker } from "../models/worker.model.js";
dotenv.config();

const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID');

const googleSignIn = async (req, res) => {
  const { token, role } = req.body; // Added role to identify User or Worker

  try {
    // Verify the token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: 'YOUR_GOOGLE_CLIENT_ID',
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    const Model = role === 'worker' ? Worker : User;

    let user = await Model.findOne({ email });

    if (!user) {
      user = new Model({
        googleId: sub,
        email,
        name,
        picture,
        isVerified: true,
      });
      await user.save();
    }

    const accessToken = setToken(user);
    const refreshToken = jwt.sign({ user, role }, process.env.JWT_SECRET || '', { expiresIn: "1d" });
    
    
    res.cookie(process.env.ACCESS_TOKEN, accessToken, { httpOnly: true, secure: true });
    res.cookie(process.env.REFERESH_TOKEN, refreshToken, { httpOnly: true, secure: true });

    res.status(200).json({ message: "Google Sign-In successful", user });
  } catch (error) {
    console.error('Error verifying Google ID token:', error);
    res.status(401).json({ message: 'Invalid Google ID token' });
  }
};
const SignUp = async (req, res) => {
  console.log('Auth routes called register');

  const { username, email, password, role } = req.body; // Added role
  // const avatar = req.files[0];
  console.log("Received email:", email);

  try {
    const Model = role === 'worker' ? Worker : User;

    const existingUser = await Model.findOne({ email });
    console.log("Existing user:", existingUser);
    
    if (existingUser) {
      return res.status(400).json({ message: 'User/Worker already exists' });
    }

    let user;
    if (role == 'user' || role == 'admin') {
      user = new Model({ username, email, password, isVerified: false });
      
    }
    else if (role == 'worker') {
      let {
            name,
            password,
            isVerified,
            services,
        phone,
            email,
            location,
            avatar,
            identity
        } = req.body;

        // Check if the worker already exists
        const existingWorker = await Worker.findOne({ phone });
        if (existingWorker) {
            return res.status(400).json({ message: 'Worker already exists with this phone number.' });
      }
      user = new Worker({
            name,
        password,
            email,
            isVerified: isVerified || false,
            services,
            phone,
            location: location || {
                type: 'Point',
                coordinates: [0, 0]
            },
            avatar: avatar || {
                public_id: '',
                url: ''
            },
            identity
        });

    }
    await user.save();

    await sendverificationemail(req, email);
    return res.status(200).json({ message: "User/Worker registered successfully", user });
  } catch (error) {
    console.error("Error in Register function:", error);
    return res.status(500).json({ message: 'Server error', error });
  }
};
const Login = async (req, res) => {
  const { email, password,role } = req.body; // Added role
  // const role = req.role;
  console.log("Login attempt for email:", email);
  
  try {
    const Model = role === 'worker' ? Worker : User;

    const user = await Model.findOne(
        { email },
        "password isVerified role"
      ).select("password isVerified role");    if (!user) {
          return res.status(400).json({ message: 'Invalid credentials: user/worker not found' });
        }
    
    const isMatch = (password === user.password); // Replace with bcrypt.compare
    // console.log(password," ",user.password);
    // console.log(process.env.ACCESS_TOKEN,process.env.REFERESH_TOKEN);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials: password does not match' });
    }

    if (!user.isVerified) {
      await sendverificationemail(req, email); 
      return res.status(403).json({ message: 'User/Worker not verified. Verification email sent.' });
    }

    const accessToken = setToken(user);
    const refreshToken = jwt.sign({ user, role }, process.env.JWT_SECERET || '', { expiresIn: "1d" });
  
    res.cookie(process.env.ACCESS_TOKEN, accessToken, { httpOnly: true, secure: true });
    res.cookie(process.env.REFERESH_TOKEN, refreshToken, { httpOnly: true, secure: true });

    return res.status(200).json({ message: "User/Worker logged in successfully", accessToken });
  } catch (error) {
    console.error("Error in Login function:", error);
    return res.status(500).json({ message: 'Server error', error });
  }
};


const logoutUser = async (req, res) => {
  try {
    console.log('logout  function is called ');
    // Clear the cookie; ensure to match the options used when setting the cookie
    res.clearCookie('access-token', {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'Strict', 
    });
    console.log('logout function is called ');
    
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};
const verifyemail = async (req, res) => {
  const { email, otp ,role} = req.body;
  console.log('Email verification is happening');

  try {
    const verificationToken = await VerificationToken.findOne({ email });

    if (!verificationToken || otp !== verificationToken.token) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // Use role from token
    const Model = role === 'user' ? User : Worker;

    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User/Worker not found." });
    }

    user.isVerified = true;
    await user.save();

    await VerificationToken.deleteOne({ email });

    res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

const tokencontroller = async (req, res) => {
  const { refereshToken } = res.cookies;

  try {
    if (!refereshToken) {
      return res.status(400).json({ message: "Verification erro" });
    }
    jwt.verify(refereshToken, process.env.JET_SECERET, (err,user) => {
      if (err) {
        res.status(403).json({ message: "Verification failed" })
        const accesstoken = setToken(user);
        res.cookie(process.env.ACCESS_TOKEN, accesstoken, {
      httpOnly: true,
      secure: true,
    
    });
    // Set token and respond
    
    return res.status(200).json({ message: "token refereshed successfully" });
      }
    })
  } catch (error) {
    return res.status(500).json({message:"Erro in refresh token making"})
  }
}
const getProfile = async (req, res) => {
  try {
    console.log(req.role);
    const Model = req.role === 'user' ? User : Worker;
    const user = await Model.findById(req.user).select('-password'); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
console.log('User profile has been send successfully');

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// searchUser
const searchUser = async (req, res) => {
    try {
        const { name="" } = req.query;

        const myChats = await Chat.find({ groupChat: false, members: req.user });
        // all user from my chat friends
        const allUsersFromMyChat = myChats.map((chat) => chat.members).flat(); 
        // all user except me and my friends
        const allUsersExceprMeAndFriends = await User.find({
            _id: { $nin: allUsersFromMyChat },
            name:{$regex:name , $options:"i"},
        }) 
        const users = allUsersExceprMeAndFriends.map(({_id,name,avatar})=>({_id,name,avatar:avatar.url}))

        return res.status(200).json({
            success: true,
            message:"search successfully",
        })
    } catch (error) {
        res.status(500).json({ message: "INternal server error " });
    }
}
const sendRequest = async (req, res) => {
    try {
        const { userId } = req.body;
        const request = await Requset.find({ sender: userId });
        if (request) return res.status(404).json({ message: "request already sent" });

        await Requset.create({
            sender: req.user,
            receiver:userId,
        })

        emitEvent(req, NEW_REQUEST, [userId], `A new reQuest`)
        res.status(200).json({message:"Send request successfully"})

    } catch (error) {
        res.status(500).json({ message: "Internal server error " });
    }
}
const acceptRequest = async (req, res) => {
    try {
        const { reqid,accept } = req.body;

        const request = await Requset.findById(reqid).populate("sender","name")
        .populate("receiver","name");

        if (!request) return res.status(404).json({ message: "request not found"});

        if (request.receiver.toString() !== req.user.toString()) {
            return res.status(404).json({ message: "You cant accepr it because Unauthorize" });
        }
        // if (request.status !== 'pending') {
        //     return res.status(404).json({ message: `You have already ${request.status} the request` });
        // }
        if (!accept) {
            await request.deleteOne();
            return res.status(200).json({ message: "ReQuset rejected successfully" });
        }

        const members = [request.sender._id,request.receiver._id]
        
        await Promise.all([
            Chat.create({
                members,
                name: `${request.sender.name}-${request.receiver.name}`,
                
            }),
            request.deleteOne()
        ])
        emitEvent(req, REFETCH_CHATS, members, `A new Chat is created`);

        res.status(200).json({ message :"Request accepted"})
    } catch (error) {
        res.status(500).json({ message: "Internal server error ",senderId :request.sender._id });
    }
}
const GetAllNotifications = async (req, res) => {
    try {
        const reuestToMe = await Requset.find({ receiver: req.user }).populate("sender", "name avatar");
        
        const allReuests = reuestToMe.map(({ _id, sender }) => ({
            _id,
            sender: {
                _id: sender._id,
                name: sender.name,
                avatar: sender.avatar,
            }
        }));
        res.status(200).json(
            {
                message: "Notification ",
                requset: allReuests
            })


    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}
const getMyFriends = async (req, res) => {
    try {
        const chatId = req.query.chatId;

        const chat = await Chat.find({ members: req.user, groupChat: false }).populate("members", "name avatar");

        const Friends = chat.map((members) => {
            const otherUser = getOtherMemeber(members, req.user);
            return {
                _id: otherUser._id,
                name: otherUser.name,
                avatar:otherUser.avatar.url,
            }
        })
        if (chatId) {
            const chat = await Chat.findById(chatId);

            const availabelFriends = Friends.filter((frnd) => !chat.members.includes(frnd._id));
            res.status(200).json(
                {
                    message: "Notification ",
                    friends :availabelFriends,
                })
        }
        else {
            res.status(200).json(
                {
                    message: "Notification ",
                    Friends,
                })
        }

    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}
const getPastBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id, status: 'completed' },"status problem workerId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user, status: 'ongoing' });
    const modifiedbooking = bookings.map(({ _id, userId, workerId, problem, cost }) => ({
      _id,
      userId, workerId,
      problem,
      cost,
    }))
    
    res.status(200).json(modifiedbooking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const submitReviewToWorker = async (req, res) => {
  try {
    const {  rating, comment } = req.body;
    const bookingid = req.params.bookingid;
    const booking = await Booking.findById(bookingid, "workerId");
    console.log(booking);
    
    const worker = await Worker.findById(booking.workerId,"review ratingcnt rating");
    console.log(worker);
    
    worker.review.push(comment);
    worker.ratingcnt = worker.ratingcnt + 1;
    worker.rating = (worker.rating + rating) / worker.ratingcnt;
    await worker.save();
    res.status(201).json({ message: 'Review submitted successfully', worker });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const chatWithWorker = async (req, res) => {
    try {
        const { message } = req.body;
      const userId = req.user;
      const workerId = req.params.workerid;
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

const deleteUserAccount = async (req, res) => {
    try {
        const userId = req.user; // Assuming `req.user` is populated by authentication middleware

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required for account deletion',
            });
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Optional: Clean up related data (e.g., Bookings, Chats)
        await Booking.deleteMany({ userId });
        await Chat.deleteMany({ userId });

        // Delete the user account
        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success: true,
            message: 'User account deleted successfully',
        });
    } catch (error) {
        console.error('Error in deleteUserAccount:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};
const markBookingAsPaid = async (req, res) => {
  try {
        const  id  = req.params.bookingid; // Get booking ID from URL params

        // Find the booking by ID
        const booking = await Booking.findById(id,"paymentStatus date workerId");

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        // Check if the booking is already marked as paid
        if (booking.paymentStatus === 'paid') {
            return res.status(400).json({ success: false, message: 'Booking is already marked as paid' });
        }

        // Update payment status
        booking.paymentStatus = 'paid';
        await booking.save();

        return res.status(200).json({
            success: true,
            message: 'Booking marked as paid successfully',
            data: booking,
        });
    } catch (error) {
        console.error('Error marking booking as paid:', error);
        return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
}

export { acceptRequest, chatWithWorker, deleteUserAccount, GetAllNotifications, getMyFriends, getPastBookings, getProfile, getUserBookings, googleSignIn, Login, logoutUser, markBookingAsPaid, searchUser, sendRequest, SignUp, submitReviewToWorker, tokencontroller, verifyemail };

