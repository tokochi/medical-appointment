import { connectToDB } from '@utils/database';
import Post from '@models/post';
import bcrypt from 'bcrypt'

// ****** Get All Data *********
export async function GET(req) {
    await connectToDB();
    try {
            const response = await Post.find();
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 501 });
    }
}
// ****** ADD New Post *********
export async function POST(req) {
    await connectToDB();
    const data = await req.json()
    const postExists = await Post.findOne({ title: data?.title });
    if (postExists) { return new Response(JSON.stringify("Post already exist"), { status: 500 }); }
    try {
        const post = new Post(data);
        await post.save();
        return new Response(JSON.stringify(post), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify("failed to insert post to DB", error), { status: 500 });
    }
}
