import mongoose, { Schema } from "mongoose";
const chatSchema = new Schema({
    groupChat: {
        type: Boolean,
        default:false,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref:"User",
    },
    workerId: {
        type: mongoose.Types.ObjectId,
        ref:"Worker",
    },
    messages: [
        {
        type: mongoose.Types.ObjectId,
        ref:"Message",
    }
    ],
    members: [
        {
            type: mongoose.Types.ObjectId,
        ref:"User",
        }
    ],    
}, { timestamps: true });
export const Chat = mongoose.model.Chat || mongoose.model("Chat", chatSchema);