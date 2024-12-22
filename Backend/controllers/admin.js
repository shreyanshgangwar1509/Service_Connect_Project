import { Chat } from "../models/chat.model";
import { Message } from "../models/message.model";
import { User } from "../models/user.model";
import { cookieopt } from "../utills/sendtoken";

const allusers = async (req, res) => {
    try {
        const users = await User.find({});

        const transformUser = await Promise.all(
            users.map(async ({ name, username, avatar, _id }) => {
            const [grpcnt,frndcnt] = Promise.all([
                Chat.countDocuments({ members: _id, groupChat: true }),
                Chat.countDocuments({ members: _id, groupChat: false }),
            
            
            ])
            return {
                name,
                username,
                avatar: avatar.url,
                _id,
                groupCount: grpcnt,
                friends:frndcnt
            }
            })
        )
        res.status(200).json({ message: "All users",
            success: true,
            transformUser
         });
    } catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
}
const allChats = async (req, res) => {
    try {
        const chats = await Chat.find({})
            .populate("members", "name avatar")
            .populate("creator", "name avatar");
        const transformedchat = await Promise.all(
            chats.map((async ({ members, _id, groupChat, name, creator }) => {
                const totalMessages = await Message.countDocuments({chat:_id})
                return {
                    _id,
                    groupChat,
                    name,
                    avatar: members.slice(0, 3).map((member) => member.avatar.url),
                    members: members.map((_id,name,avatar) => {
                        return {
                            _id,
                            name,
                            avatar:avatar.url,
                        }
                    }),
                    creator: {
                        name: creator.name || "None",
                        avatar:creator.avatar.url || "",
                    },
                    totalMembers:members.length,
                    totalMessages,
                }
            }))
        )
        res.status(200).json({
            message: "All cahts",
            chats,
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
}
const allmessages = async (req, res) => {
    try {
        const message = await Message.find({})
            .populate("sender", "name avatar")
            .populate("chat", "groupChat");
        
        const transformedmessage = message.map(({ content, attachments, _id, sender, createdAt, chat }) => ({
            _id,
            attachments,
            content,
            createdAt,
            chat: chat._id,
            groupChat:chat.groupChat,
            sender: {
                _id: sender._id,
                name: sender.name,
                avatar:sender.avatar.url,
            }
        }))

        
        res.status(200).json({
            message: "All cahts",
            transformedmessage, 
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
}

const getDashboardStats = async (req, res) => {
    try {
        const [groupCount,userCount,messagesCount,totalChatCount] = await Promise.all([
            Chat.countDocuments({ groupChat: true }),
            User.countDocuments(),
            Message.countDocuments(),
            Chat.countDocuments(),
        ])

        const today = new Date();

        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);

        const last7daysMessages = await Message.find({
            createdAt: {
                $gte: last7Days,
                $lte: today,
            },
        }).select("createdAt");

        const messages = new Array(7).fill(0);

        last7daysMessages.forEach(message => {
            const indexapp = (today.getTime() - message.createdAt.getTime()) / (1000 * 60 * 60 * 24);
            const index = Math.floor(indexapp);
            message[6-index]++;
        })
        const stats = {
            groupCount,
            userCount,messagesCount,totalChatCount
        }
        res.status(200).json({
            message: "All dashboard",
            stats, 
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
}

const adminLogin = async (req, res) => {
    try {
        const { seceretKey } = req.body;
        const adminSeceretKey = process.env.ADMIN_SECERET_KEYS|| "Shrey";
        const isMatch = seceretKey === adminSeceretKey;
        if (!isMatch) {
            return res.status(400).json({ message: "You are not admin" });
        }
        const token = jwt.sign(seceretKey, process.env.JWT_SECERET);
        
        res.status(200).cookie("admin-token", token, {
            ...cookieopt,
            masxAge: 1000 * 60 * 15
        }).json({ message: "Auhtentication succesfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
}

const adminLogout = async (req, res) => {
    try {
        
        
        res.stats(200).cookie("admin-token", "", {
            ...cookieopt,
            masxAge: 0
        }).json({ message: "Admin logout successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
}

const getAdminData = async (req, res) => {
    try {
        return res.status(200).json({
            admin:true,
        })
    } catch (error) {
        
    }
}



export default {getAdminData,getDashboardStats,adminLogin,adminLogout, allusers ,allChats,allmessages};

