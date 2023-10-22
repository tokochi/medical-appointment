import { connectToDB } from '@utils/database';
import User from '@models/user';
import { parse } from 'url';
// ****** Update *********
export async function GET(req, { params }) {
    const parsedUrl = parse(req.url, true);
    const { query } = parsedUrl;
    const messageId = query.messageId;
    await connectToDB();
    try {
        if (!params?.id) {
            return new Response('Missing ID parameter', { status: 400 }); // Bad Request
        }
        if (!messageId) {
            return new Response('Missing ID parameter', { status: 400 }); // Bad Request
        }
        const response = await User.updateOne(
            { _id: params?.id },
            { $pull: { notificationsList: { _id: messageId } } },
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

