
const messageSchema = new Schema({
    content:String,
    sender: {
        type: Types.ObjectId,
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
        type: Types.ObjectId,
        ref:"Chat",
    },
    members: [
        {
            type: Types.ObjectId,
        ref:"User",
        }
    ],    
}, { timestamps: true });
export const Message = models.Message || mogoose.model("Message", messageSchema);