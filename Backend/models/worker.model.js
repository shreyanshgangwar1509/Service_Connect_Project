
const workerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    isVerified: {
        type: Boolean,
        required:true,
    },
    services: [
        {
            Type:String
        }
    ],
    phone: {
        type: String,
        required:true,
    },
    location: {
    type: {
        type: String, // GeoJSON type
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
        type: [Number], // [longitude, latitude]
            default: [0, 0],
        },
    },
    avaliable: {
        type: Boolean,
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
    },
    identity: {
        IdentityType:{
            Type: String,
            required:true,
        },
        IdentityNumber: {
            Type: String,
            required:true,
        }
    },
}, { timestamps: true });

workerSchema.index({ location: '2dsphere' });
workerSchema.pre("save", async  function(next) {
    if (this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 10);
})

export const Worker = models.Worker || mogoose.model("Worker", workerSchema);