import { Schema, model, models, Types } from 'mongoose';
// *********** Schema **********
const questionSchema = new Schema({
    title: String,
    text: String,
    speciality: {},
    responses: [{
        id: {
            type: Types.ObjectId,
            default: Types.ObjectId,
        },
        date: { type: Date, default: Date.now },
        text: String,
        doctor: {},
        likes: Number,
        comments: [{
            id: {
                type: Types.ObjectId,
                default: Types.ObjectId,
            }, text: String, date: { type: Date, default: Date.now }, author: String,
        }],
        doctorID: {
            type: Schema.ObjectId,
            ref: 'Doctor',
        },
    }],
    author: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    details: {},
    files: [],
    doctor:{},
    doctorID: {
        type: Schema.ObjectId,
        ref: 'Doctor',
    },
    date: { type: Date, default: Date.now },
})
const Question = models.question || model("question", questionSchema);
export default Question;