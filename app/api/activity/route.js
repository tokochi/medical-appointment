import { connectToDB } from '@utils/database';
import Activity from '@models/activity';
import bcrypt from 'bcrypt'

// ****** Get All Data *********
export async function GET(req) {
    await connectToDB();
    try {
        const response = await Activity.find();
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 501 });
    }
}

// ****** ADD New Activity *********
export async function POST(req) {
    await connectToDB();
    const data = await req.json()
 try {
        const activity = new Activity(data);
        await activity.save();
        return new Response(JSON.stringify(activity), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify("failed to insert activity to DB", error), { status: 500 });
    }
}
