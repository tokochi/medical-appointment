import { Schema, model, models } from 'mongoose';

// *********** Schema **********
const postSchema = new Schema({
    title: "string",
    image: "string",
    text: "string",
    speciality: {},
    author: "string", 
    date: { type: Date, default: Date.now },
})
const Post = models.post || model("post", postSchema);
export default Post;