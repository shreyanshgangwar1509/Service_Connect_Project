import mongoose, { Schema } from "mongoose";
const chatSchema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
    },
    groupChat: {
        type: Boolean,
        default:false,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref:"User",
    },
    members: [
        {
            type: mongoose.Types.ObjectId,
        ref:"User",
        }
    ],    
}, { timestamps: true });
export const Chat = mongoose.model.Chat || mongoose.model("Chat", chatSchema);