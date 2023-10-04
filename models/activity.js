import { Schema, model, models } from 'mongoose';

// *********** Schema **********
const activitySchema = new Schema({
    action: "string",
    type: "string",
    source: "string",
    status: "string",
    from: "string",
    date: { type: Date, default: Date.now },

})
const Activity = models.activity || model("activity", activitySchema);
export default Activity;