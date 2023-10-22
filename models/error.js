import { Schema, model, models } from 'mongoose';

// *********** Schema **********
const errorSchema = new Schema({
    session: String,
    path: String,
    Error: {},
    error: String,
    message: String,
    date: { type: Date, default: Date.now },
})
const Error = models.error || model("error", errorSchema);
export default Error;