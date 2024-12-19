import { NEW_REQUEST, REFETCH_CHATS } from "../constants/Events";
import { getOtherMemeber } from "../lib/helper";
import { Chat } from "../models/chat.model";
import { Requset } from "../models/reuest.model";
import { User } from "../models/user.model";
import emitEvent from "../utills/emitEvent";
import { cookieopt, sendtoken } from "../utills/sendtoken";

const SignUp = async(req,res) => {
    try {
        const { name, username, password, bio } = req.body;
        
        const newuser = await User.create(
            { name, username, password,bio,avatar });
        // res.statue(200).json({message:"Creted sussceefully",newuser}
        sendtoken(res, newuser, 200, "User created");
    } catch (error) {
        res.status(500).json({ message: "Error in creating user" });
    }
}
const login = async(req, res,next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }).select("+password");
    
        if (!user) 
            return res.status(400).json({ message: "Invalid username" });
    
            const isMatch = await compare(password, user.password);
    
        if (!isMatch)
            return res.status(400).json({ message: "Invalid password" });
    
        sendtoken(res.user, 200, `Welcome , ${user.username}`);
    } catch (error) {
        next(error);
    }

}

const getMyprofile = async (req, res) => {
    //  return await 
    try {
        const id = req.user;
        const user = await User.findById(id);

        res.status(200).json({
            success: true,
            user,
        })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
const logout = async (req, res) => {
    try {
        return res.status(200).cookie("access-token", "", {...cookieopt , maxAge:0}).json({
            success: true,
            message:"Logout successfully",
        })
    } catch (error) {
        res.status(500).json({ message: "INternal server error " });
    }
}
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
    const bookings = await Booking.find({ userId: req.user.id, status: 'completed' });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id, status: 'ongoing' });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const submitReviewToWorker = async (req, res) => {
  try {
    const { workerId, rating, comment } = req.body;

    const review = new Review({
      reviewerId: req.user.id,
      workerId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: 'Review submitted successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
export { submitReviewToWorker,acceptRequest, GetAllNotifications, GetAllNotifications, getMyFriends, getMyprofile, getPastBookings, getUserBookings, login, logout, searchUser, sendRequest, SignUp };

