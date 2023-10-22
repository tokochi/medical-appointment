import { connectToDB } from '@utils/database';
import Admin from '@models/admin';
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
            return new Response('Missing ID parameter', { status: 400 });
        } 
        const response = await Admin.updateOne(
            { _id: params?.id },
            { $pull: { notificationsList: { _id: messageId } } },
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

