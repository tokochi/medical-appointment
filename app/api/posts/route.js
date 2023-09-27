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
    const userExists = await Post.findOne({ title: data?.title });
    if (userExists) { return new Response(JSON.stringify("Post already exist"), { status: 500 }); }
    try {
        // const hashedPassword = await bcrypt.hash(data?.password, 10);
        const post = new Post(data);
        await post.save();
        return new Response(JSON.stringify(post), { status: 201 })
    } catch (error) {
        console.log("🚀 ~ error:", error)
        return new Response(JSON.stringify("failed to insert post to DB", error), { status: 500 });
    }
}

// ****** Update *********
export async function PUT(req) {
    await connectToDB();
    const data = await req.JSON()
    try {
        const response = await Post.updateOne({ _id: data?._id }, { $set: data })
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

// ****** Delete *********
export async function DELETE(req) {
    await connectToDB();
    const data = await req.JSON()
    try {
        const response = await Post.deleteOne({ _id: data?._id })
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

