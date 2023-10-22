import { connectToDB } from '@utils/database';
import Doctor from '@models/doctor';
import { parse } from 'url';
// ****** Update *********
export async function GET(req, { params }) {
    const parsedUrl = parse(req.url, true);
    const { query } = parsedUrl;
    const inboxId = query.inboxId;
    await connectToDB();
    try {
        if (!params?.id) {
            return new Response('Missing ID parameter', { status: 400 }); // Bad Request
        }
        const response = await Doctor.updateOne(
            { _id: params?.id },
            { $pull: { inbox: { _id: inboxId } } },
        );
        if (response) {
            return new Response('Doctor updated successfully', { status: 200 }); // OK
        } else {
            return new Response('Failed to update Doctor', { status: 500 }); // Internal Server Error
        }
    } catch (error) {
        return new Response(JSON.stringify(error.message), { status: 500 });
    }
}
