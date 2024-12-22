import { ALERT, NEW_ATTACHMENT, NEW_MESSAGE_ALERT, REFETCH_CHATS } from "../constants/Events.js";
import { getOtherMemeber } from "../lib/helper.js";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import DeleteFilesFromCloudinary from "../utills/DeleteFilesCloud.js";
import emitEvent from "../utills/emitEvent.js";

const newGroupChat = async (req, res) => {
    const { name, members } = req.body
    
    try {
        if (members.length < 2) return res.status(400).json({ message: "Grooup chat must have atleast 3 memebers" });

        const allMembers = [...members, req.user];

        await Chat.create({
            name,
            groupChat: true,
            creator: req.user,
            members:allMembers,
        })
        emitEvent(req, ALERT, allMembers, `Welcome to ${name} group `);
        emitEvent(req, REFETCH_CHATS, members);
        return res.status(201).json({message:"group creted "})
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
const getMyChat = async (req, res) => {
    
    try {
        if (members.length < 2) return res.status(400).json({ message: "Grooup chat must have atleast 3 memebers" });

        const allMembers = [...members, req.user];

        const chats = await Chat.find({ members: req.user }).populate(
            "members","name avatar"
        );

        const transformedChats = chats.map(({_id,name,members,groupChat})=> {
            
            const otherMember = getOtherMemeber(members, req.user);
    return {
        _id,
        groupChat,
        avatar:groupChat?members.slice(0,3).map((avatar)=>{avatar.url}):[otherMember.avatar.url],
        name:groupChat?name:otherMember.name,
        members: members.reduce((prev, curr) => {
            if (curr._id.toString() !== req.user.toString()) {
                prev.push(curr._id);
            }
            return prev;
        },[]),
        
            }
        })

        return res.status(200).json({message:"group creted ",chats:transformedChats})
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const getMyGroups = async (req, res) => {
    try {
        const chats = await Chat.find({
            members: req.user,
            groupChat: true,
            creator:req.user,
        }).populate("members", "name avatar")
        
        const groups = chats.map(({ members, _id, groupChat, name }) => ({
            _id, groupChat,
            name,
            avatar: members.slice(0, 3).map(({ avatar }) => avatar.url)
        }));

         return res.status(200).json({message:"group creted ",groups})
    } catch (error) {
        
    }
}
const addMembers = async(req,res) => {
    try {
        const { chatId, members } = req.body;

        if (!members || members.length < 1) res.status(400).json({ message: "No members in this chat" });
        
        const chat = await Chat.findById(chatId);
        if (!chat) res.status(400).json({ message: "Chat not found " });

        if (!chat.groupChat) res.status(400).json({ message: "This is not a group chat " });

        if (chat.creator.toString() !== req.user.toString()) {
            res.status(400).json({message:"You are not admin of this chat group not allowed to addmember"})
        }

        const allNewMembersPromise = members.map((i) => User.findById(i,"name"));
        
        const allMembers = await PromiseRejectionEvent.all(allNewMembersPromise);

        const unimem = allMembers.filter((i) => !chat.members.includes(i._id.toString())).map((i)=>i._id);

        chat.members.push(...unimem);

        

        if (chat.members.length > 100) {
            res.status(405).json({message:"Group members reached limits"})
        }

        await chat.save();

        const allUserName = allMembers.map((i) => i.name).join("");

        emitEvent(req, ALERT
            , chat.members,
            `${allUserName} has been added `
            
        )
        emitEvent(req
            , REFETCH_CHATS,
            chat.members
        )


        return res.status(200).json({message:"Member added successfully"})

    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}

const removeMembers = async (req, res) => {
    try {
        const { userId, chatId } = req.body;
        
        const[chat, userThatWIllBeRemoved] = await Promise.all([
            Chat.findById(chatId),
            User.findById(userId,"name")
        ]) 
        if (!chat) res.status(400).json({ message: "Chat not found " });

        if (!chat.groupChat) res.status(400).json({ message: "This is not a group chat " });

        if (chat.creator.toString() !== req.user.toString()) {
             return res.status(400).json({message:"You are not admin of this chat group not allowed to addmember"})
        }

        if (chat.members.length <= 3) {
            return res.status(404).json({ message: "Group has at least 3 members" });
        }

        chat.members = chat.members.filter(
            (member) => member.to_String() !== userId.toString()
        );
        await chat.save();

        emitEvent(
            req,
            ALERT,
            chat.members,
            `${userThatWIllBeRemoved.name} has been removed `
        );
        emitEvent(req, REFETCH_CHATS, chat.members);
        res.status(200).json({ message: "Members removed successfully" });

    } catch (error) {
        
    }
}


const LeaveGroup = async (req, res) => {
    try {
        const chatId = req.params.id;
        const user = await User.findById(req.user,"name");
        const chat= await Chat.findById(chatId)
        if (!chat) res.status(400).json({ message: "Chat not found " });

        if (!chat.groupChat) res.status(400).json({ message: "This is not a group chat " });

        const RemainingMember = chat.members.filter((member) => member.toString() !== req.user.toString());

         if (RemainingMember.length < 3) {
            return res.status(404).json({ message: "Group has at least 3 members" });
        }
        if (chat.creator.toString() === req.user.toString()) {
            const random = Math.floor(Math.random() * removeMembers.length);
            // for random member
            const newCreator = RemainingMember[random];

            //for first 
            // const newCreator = RemainingMember[0];
            chat.creator = newCreator;
            
        }
        chat.members = RemainingMember;

        await chat.save();
        
        emitEvent(
            req,
            ALERT,
            chat.members,
            `${user.name} has been left `
        );
        res.status(200).json({ message: "Members removed successfully" });

    } catch (error) {
        
    }
}
const sendAttachment = async(req, res) => {
    try {
        const { chatId } = req.body;

        const [chat,me] = await Promise.all([
            Chat.findById(chatId),
            User.findById(req.user,"name"),
        ]);      

        if (!chat) res.status(400).json({ message: "Chat not found " });

        const files = req.files || [];

        if (files.length < 1) {
            return res.status(404).json({message:"File is not Provided "})
        }

        // upload files
        const attachments = [];
        const messageForRealTime = {
            content: "",
            attachments,
            sender: me._id,
            chat:chatId
        }

        const messageForDB = {
            content: "",
            attachments,
            sender: {
                _id: me._id,
                name:me.name,
            },
        chat:chatId};

        const message = await Message.create(messageForDB)
        emitEvent(req, NEW_ATTACHMENT, chat.members, {
            mesage: messageForRealTime,
            chatId
        });

        emitEvent(req,NEW_MESSAGE_ALERT,chat.members,{chatId})
        
        return res.status(200).json({
            message,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error " });
    }
}

const getChatDetails = async (req, res) => {
    try {
        if (req.query.populate === 'true') {
            const chat = await Chat.findById(req.params.id).populate("members", "name avatar")
                .lean();
            
            if (!chat) return res.status(404).json({ message: "Chat not found" });

            chat.members= chat.members.map(({ _id, name, avatar }) =>
            ({
                _id, name,
                avatar:avatar.url,
            }))
            return res.status(200).json({
                success:true,
                chat,
            })
        }
        else {
            const chat = await Chat.findById(req.params.id);

            if (!chat) return res.status(404).json({ message: "Chat not found " });
            return res.status(200).json({
                success: true,
                chat,
            })
        }
    } catch (error) {
                return res.status(500).json({ message: "Internal server error " });

    }
}

const renameGroup = async (req, res) => {
    try {
        const { name } = req.body;
        const chatId = req.params.id;
        const chat = await Chat.findById({ _id: chatId, groupChat: true }, "name");
        
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }
        if (!chat.groupChat)
            return res.status(400).json({ message: "this is not a group chat" });

        if (chat.creator.toString() !== req.user.toString())
            return res.status(404).json({ mesage: "You are not allowed to edit name" });

        chat.name = name;
        await chat.save();
        emitEvent(req, REFETCH_CHATS, chat.members, `Group Name changed to ${name}`);

        return res.status(200).json({
            success: true,
            message:"Group name changed successfully"
        });
    } catch (error) {
                return res.status(500).json({ message: "Internal server error " });
    }
}

const deleteChat = async (req, res) => {
    try {
        const chatId = req.params.id;

        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(400).json({ mesage: "Chat not found" });
        }
        const members = chat.members;
        if (chat.groupChat && chat.creator.toString() !== req.user.toString()) {
            return res.status(404).json({ mesage: "You are not allowed to delete group" });
        }

        if (!chat.groupChat && !chat.members.includes(req.user.toString())) {
            return res.status(404).json({ mesage: "You are not allowed to delete chat" });
        }

        // delete all message and attachment from cloudinary
        const messageWithAttachment = await Message.find * { chat: chatId, attachments: { $exists: true, $ne: [] } }
    
        const public_ids = [];

        messageWithAttachment.forEach(({ attachment }) => 
            attachment.forEach(({ public_id }) => 
                public_ids.push(public_id)
            )
        )
        await Promise.all([
            // delet files from cloudinary
            DeleteFilesFromCloudinary(public_ids),
            chat.deleteOne(),
            Message.deleteMany({chat:chatId})
        ])

    
        emitEvent(req,REFETCH_CHATS,members,`chat deleted`)

        res.status(200).json({ message: "Chat deleted succeffully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error " });
    }
}

const getMessages = async (req, res) => {
    try {
        const chatId = req.params.id;
        const { page = 1 } = req.query;
        const limit = 20;
        const [messages,totalMessageCount] = await Promise.all([Message.find({ chat: chatId })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("sender", "name avatar")
            .lean(),
            Message.countDocuments({chat:chatId})
        ])
        const totalPages = Math.ceil(totalMessageCount / limit) || 0;

        return res.status(200).json({
            success: true,
            message: messages.reverse(),
            totalPages,
        })
        
    } catch (error) {
        res.status(500).json({message:"Internal server error "})
    }
}


export { addMembers, deleteChat, getChatDetails, getMessages, getMyChat, getMyGroups, LeaveGroup, newGroupChat, removeMembers, renameGroup, sendAttachment };

