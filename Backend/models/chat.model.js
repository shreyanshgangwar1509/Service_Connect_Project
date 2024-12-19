
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
        type: Types.ObjectId,
        ref:"User",
    },
    members: [
        {
            type: Types.ObjectId,
        ref:"User",
        }
    ],    
}, { timestamps: true });
export const Chat = models.Chat || mogoose.model("Chat", chatSchema);