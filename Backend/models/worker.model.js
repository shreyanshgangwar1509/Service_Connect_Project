import mongoose, { Schema } from "mongoose";

const workerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true,
        select: false, // Prevent password from being included in queries by default
    },
    isVerified: {
        type: Boolean,
        default:false,
    },
    role: {
        type: String,
        default:'worker,'
    },
    services: [
        {
            type: String, // Corrected 'Type' to 'type'
        }
    ],
    phone: {
        type: String,
        // required: true,
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
            // required: true,
        },
        url: {
            type: String,
            // required: true,
        },
    },
    identity: {
        identityType: { // Corrected 'IdentityType' to 'identityType'
            type: String,
            // required: true,
        },
        identityNumber: { // Corrected 'IdentityNumber' to 'identityNumber'
            type: String,
            // required: true,
        }
    },
    ratingcnt: {
        type: Number,
        default:0,
    },
    rating: {
        type: Number,
        default:0,
    },
    review: [{
        star:{
        type:Number,
        },
        content: {
        type:String,}}],
    portfolio: {
        projects: [
            {
                title: { type: String, required: true },
                description: { type: String },
                images: [
                    {
                        public_id: { type: String },
                        url: { type: String }
                    }
                ],
                completedAt: { type: Date }
            }
        ],
        experience: {
            years: { type: Number, default: 0 },
            details: { type: String }
        },
        moneyManagement: {
            monthly: [
                {
                    month: { type: String, required: true },
                    income: { type: Number, default: 0 },
                    expenses: { type: Number, default: 0 },
                    savings: { type: Number, default: 0 }
                }
            ],
            yearly: [
                {
                    year: { type: Number, required: true }, 
                    totalIncome: { type: Number, default: 0 },
                    totalExpenses: { type: Number, default: 0 },
                    totalSavings: { type: Number, default: 0 }
                }
            ]
        }
    }
}, { timestamps: true });

// Add Geospatial Index
workerSchema.index({ location: '2dsphere' });

// Hash password before saving
// workerSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });

// Prevent duplicate model definition
export const Worker = mongoose.models.Worker || mongoose.model("Worker", workerSchema);
