import { connectToDB } from '@utils/database';
import Notification from '@models/notification';
// ****** Get All Data *********
export async function GET(req) {
    await connectToDB();
    try {
        const response = await Notification.find();
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 501 });
    }
}
// ****** ADD New Notification *********
export async function POST(req) {
    await connectToDB();
    const data = await req.json()
 try {
        const notification = new Notification(data);
        await notification.save();
        return new Response(JSON.stringify(notification), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify("failed to insert notification to DB", error), { status: 500 });
    }
}
