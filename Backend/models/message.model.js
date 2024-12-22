import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    content:String,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
                required: true,
    },
    attachments: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        }
    ],
    chat: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref:"Chat",
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        }
    ],    
}, { timestamps: true });
export const Message = mongoose.model.Message || mongoose.model("Message", messageSchema);