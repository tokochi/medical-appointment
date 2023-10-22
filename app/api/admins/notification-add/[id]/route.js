import { connectToDB } from '@utils/database';
import Admin from '@models/admin';
// ****** Update *********
export async function PUT(req, { params }) {
    await connectToDB();
    const data = await req.json()
 try {
        if (!params?.id) {
            return new Response('Missing ID parameter', { status: 400 }); // Bad Request
        }
        if (!data) {
            return new Response('Empty request body', { status: 400 }); // Bad Request
        }
        const response = await Admin.updateOne(
            { _id: params?.id, notifications: { $in: [data?.type] } },
            { $push: { notificationsList: { $each: [{ action: data.action, type: data.type, source: data.source, }], $position: 0 } } }
        );
   if (response) {
            return new Response('notification updated successfully', { status: 200 }); // OK
        } else {
            return new Response('Failed to update notification', { status: 500 }); // Internal Server Error
        }
    } catch (error) {
        return new Response(JSON.stringify(error.message), { status: 500 });
    }
}

