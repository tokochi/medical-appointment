import { connectToDB } from '@utils/database';
import Post from '@models/post';
import bcrypt from 'bcrypt'

// ****** Get All Data *********
export async function GET(req,{params}) {
    await connectToDB();
    try {
        if (params?.id) {
            const response = await Post.findOne({ _id: params?.id });
            return new Response(JSON.stringify(response), { status: 200 });
        }
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 501 });
    }
}
