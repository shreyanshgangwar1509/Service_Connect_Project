import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Worker",
        required: true,
    },
    message:String,
    attachments: [
        {
            public_id: {
                type: String,
                
            },
            url: {
                type: String,
                
            },
        }
    ],
}, { timestamps: true });
export const Message = mongoose.model.Message || mongoose.model("Message", messageSchema);