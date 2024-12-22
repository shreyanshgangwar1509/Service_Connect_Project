
const userSchema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
        enum:['user','admin']
    },
    isVerified: {
        type: Boolean,
        required:true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    }
}, { timestamps: true });

userSchema.pre("save", async  function(next) {
    if (this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 10);
})

export const User = models.User || mogoose.model("User", userSchema);