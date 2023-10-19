import { Schema, model, models } from 'mongoose';
// *********** Schema **********
const notificationSchema = new Schema({
    action: String,
    type: String,
    source: String,
    text: String,
    title: String,
    to: {},
    date: { type: Date, default: Date.now },
})
const Notification = models.notification || model("notification", notificationSchema);
export default Notification;