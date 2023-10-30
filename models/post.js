import { Schema, model, models } from 'mongoose';

// *********** Schema **********
const postSchema = new Schema({
    title: {
        type: String,
        unique: [true, 'title already exists!'],
        required: [true, 'title is required!']
    },
    image: String,
    text: String,
    desc: String,
    tags: [],
    section: String,
    speciality: {},
    doctor: {},
    author: String,
    date: { type: Date, default: Date.now },
})
const Post = models.post || model("post", postSchema);
export default Post;