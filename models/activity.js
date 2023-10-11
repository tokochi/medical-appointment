import { Schema, model, models } from 'mongoose';

// *********** Schema **********
const activitySchema = new Schema({
    action: String,
    type: String,
    source: String,
    status: String,
    from: String,
    date: { type: Date, default: Date.now },

})
const Activity = models.activity || model("activity", activitySchema);
export default Activity;