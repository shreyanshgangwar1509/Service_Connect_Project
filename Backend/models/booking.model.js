const BookingSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    workerId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true
    }, 
    address: {
        type: String,
        required: true,
    },
    service: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    cost: { type: Number, required: true },
    status: { type: String, enum: ['ongoing', 'completed', 'cancelled'], default: 'ongoing' },
    paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
    problem: {
        type: String,
    },
    ProblemPic: {
        type: String,
    },
    cancellationReason: { type: String },
    
}, { timestamps: true });
export const Booking = models.Booking || mogoose.model("Booking", BookingSchema);