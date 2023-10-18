import { connectToDB } from '@utils/database';
import { sendEmail } from '@utils/mailer';
import { parse } from 'url';
// ****** ADD New User *********
export async function GET(req) {
    const parsedUrl = parse(req.url, true);
    const { query } = parsedUrl;
    const id = query.id;
    const email = query.email;
    await connectToDB();
    try {
        await sendEmail({ userId: id, email, type: "VERIFY" })
        return new Response(JSON.stringify({ message: "sending verification email ....", success: true }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify("🚀 ~ failed to insert user to DB", error), { status: 500 });
    }
}

// ****** ADD New User *********
export async function POST(req) {
    await connectToDB();
    try {
        const data = await req.json()
        if (!data) {
            return new Response('Empty request body', { status: 400 }); // Bad Request
        }
        await sendEmail({ ...data, type: "VERIFY"})
return new Response(JSON.stringify({ message: "sending verification email ....", success: true }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify("🚀 ~ failed to insert user to DB", error), { status: 500 });
    }
}


