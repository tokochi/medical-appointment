import { connectToDB } from '@utils/database';
import Doctor from '@models/doctor';

// ****** Update *********
export async function GET(req, { params }) {
    await connectToDB();
    try {
        if (!params?.id) {
            return new Response('Missing ID parameter', { status: 400 }); // Bad Request
        }
        const response = await Doctor.updateOne(
            { _id: params?.id },
            { $pull: { notificationsList: { type: { $ne: "رسالة" } } } },
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

