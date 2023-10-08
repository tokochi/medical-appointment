import { connectToDB } from '@utils/database';
import User from '@models/user';
import bcrypt from 'bcrypt'
import { sendEmail } from '@utils/mailer';

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
    const userExists = await User.findOne({ email: data?.email });
    if (userExists) { return new Response(JSON.stringify("User already exist"), { status: 500 }); }
    try {
        const hashedPassword = await bcrypt.hash(data?.password, 10);
        const user = new User({ ...data, password: hashedPassword });
        await user.save();
        // await sendEmail({ email: data?.email,emailType:"VERIFY", userId:user._id})
        return new Response(JSON.stringify(user), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify("failed to insert user to DB",error), { status: 500 });
    }
}


