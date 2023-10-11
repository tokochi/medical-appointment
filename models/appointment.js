import { Schema, model, models } from 'mongoose';

// *********** Schema **********
const appointmentSchema = new Schema({
    time: String,
    user: {
        id: {
            type: Schema.ObjectId,
            ref: 'User',
        },
        email: String,
        phone: String,
        name: String,
    },
    doctor: {
        type: Schema.ObjectId,
        ref: 'Doctor',
    },
    status: String,
    visitArg: String,
    desc: String,
    expiryDate: {
        type: Date,
        default: () => new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000),
    },
    date: { type: Date, default: Date.now },
})
const Appointment = models.appointment || model("appointment", appointmentSchema);
export default Appointment;