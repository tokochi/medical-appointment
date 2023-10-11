import { Schema, model, models } from 'mongoose';

// *********** Schema **********
const postSchema = new Schema({
    title: String,
    image: String,
    text: String,
    speciality: {},
    author: String, 
    date: { type: Date, default: Date.now },
})
const Post = models.post || model("post", postSchema);
export default Post;