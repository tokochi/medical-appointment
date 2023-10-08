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
    await connectToDB();
    const data = await req.json()
    const user = await User.findOne({ verifyToken: data?.token, verifyTokenExpiry: { $gt: Date.now() } });
    if (!user) { return new Response(JSON.stringify("User not Found"), { status: 500 }); }
    try {
        user.isVerified = true,
            user.verifyToken = undefined,
            user.verifyTokenExpiry = undefined,
            await user.save();
        return new Response(JSON.stringify({ message: "Email verified successfully", success: true }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify("failed to insert user to DB", error), { status: 500 });
    }
}


