import mongoose, { Schema } from "mongoose";
const requestSchema = new Schema({
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "accepted", "rejected"],
    },

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
     
}, { timestamps: true });
export const Requset = mongoose.model.Requset || mongoose.model("Requset", requestSchema);
