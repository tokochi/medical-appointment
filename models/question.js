import { Schema, model, models } from 'mongoose';

// *********** Schema **********
const questionSchema = new Schema({
    title: "string",
    text: "string",
    speciality: {},
    response: "string",
    author: "string",
    details: {},
    files: [],
    doctorID: {
        type: Schema.ObjectId,
        ref: 'Doctor', // Reference the User model
    },
    date: { type: Date, default: Date.now },
})
const Question = models.question || model("question", questionSchema);
export default Question;