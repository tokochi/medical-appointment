import { connectToDB } from '@utils/database';
import Admin from '@models/admin';
// ****** Update *********
export async function GET(req, { params }) {
    await connectToDB();
    try {
        if (!params?.id) {
            return new Response('Missing ID parameter', { status: 400 }); // Bad Request
        }
        const response = await Admin.updateOne(
            { _id: params?.id },
            { $pull: { notificationsList: { type: { $ne: "رسالة" } } } },
        );
        if (response) {
            return new Response('Admin updated successfully', { status: 200 }); // OK
        } else {
            return new Response('Failed to update Admin', { status: 500 }); // Internal Server Error
        }
    } catch (error) {
        return new Response(JSON.stringify(error.message), { status: 500 });
    }
}

