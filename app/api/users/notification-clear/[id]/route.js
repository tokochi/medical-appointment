import { connectToDB } from '@utils/database';
import User from '@models/user';
// ****** Update *********
export async function GET(req, { params }) {

    await connectToDB();
    try {
        if (!params?.id) {
            return new Response('Missing ID parameter', { status: 400 }); // Bad Request
        }
        const response = await User.updateOne(
            { _id: params?.id },
            { $pull: { notificationsList: { type: { $ne: "رسالة" } } } },
        );
        if (response) {
            return new Response('User updated successfully', { status: 200 }); // OK
        } else {
            return new Response('Failed to update User', { status: 500 }); // Internal Server Error
        }
    } catch (error) {
        return new Response(JSON.stringify(error.message), { status: 500 });
    }
}

