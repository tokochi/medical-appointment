import { connectToDB } from '@utils/database';
import User from '@models/user';
import bcrypt from 'bcrypt'
import { sendEmail } from '@utils/mailer';


// ****** ADD New User *********
export async function POST(req) {
    await connectToDB();
    try {
        const data = await req.json()
        if (!data) {
            return new Response('Empty request body', { status: 400 }); // Bad Request
        }
         await sendEmail({ email: data?.user?.email, type: "PIN_CODE", userId: data?.user?.id })
return new Response(JSON.stringify({ message: "sending Pin Code ....", success: true }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify("🚀 ~ failed to insert user to DB", error), { status: 500 });
    }
}


