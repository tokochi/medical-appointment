import { connectToDB } from '@utils/database';
import User from '@models/user';
import bcrypt from 'bcrypt'

// ****** Get All Data *********
export async function GET(req) {
    await connectToDB();
    try {
        if (req?.query?.id) {
            const response = await User.findOne({ _id: req?.query?.id });
            return new Response(JSON.stringify(response), { status: 200 });
        }
        else {
            const response = await User.find();
            return new Response(JSON.stringify(response), { status: 200 });
        }
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 501 });
    }
}
// ****** ADD New User *********
export async function POST(req) {
    const data = await req.json()

}

// ****** Update *********
export async function PUT(req) {
    await connectToDB();
    const data = await req.JSON()
    try {
        const response = await User.updateOne({ _id: data?._id }, { $set: data })
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
        const response = await User.deleteOne({ _id: data?._id })
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

