import mongoose, { Schema } from "mongoose";

const workerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // Prevent password from being included in queries by default
    },
    isVerified: {
        type: Boolean,
        required: true,
    },
    services: [
        {
            type: String, // Corrected 'Type' to 'type'
        }
    ],
    phone: {
        type: String,
        required: true,
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
    available: {
        type: Boolean,
        default: true, // Default value added
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
        identityType: { // Corrected 'IdentityType' to 'identityType'
            type: String,
            required: true,
        },
        identityNumber: { // Corrected 'IdentityNumber' to 'identityNumber'
            type: String,
            required: true,
        }
    },
}, { timestamps: true });

// Add Geospatial Index
workerSchema.index({ location: '2dsphere' });

// Hash password before saving
workerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Prevent duplicate model definition
export const Worker = mongoose.models.Worker || mongoose.model("Worker", workerSchema);
