import { Schema, model, models } from 'mongoose';

// *********** Schema **********
const appointmentSchema = new Schema({
    time: "string",
    user: {
        id: {
            type: Schema.ObjectId,
            ref: 'User',
        },
        email: "string",
        phone: "string",
        name: "string",
    },
    doctor: {
        type: Schema.ObjectId,
        ref: 'Doctor',
    },
    status: "string",
    visitArg: {
        text: "string",
        value: "string"
    },
    desc: "string",
    expiryDate: {
        type: Date,
        default: () => new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000),
    },
    date: { type: Date, default: Date.now },
})
const Appointment = models.appointment || model("appointment", appointmentSchema);
export default Appointment;