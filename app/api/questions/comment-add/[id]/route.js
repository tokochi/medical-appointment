import { connectToDB } from '@utils/database';
import Question from '@models/question';

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
        const response = await Question.findOneAndUpdate(
            { _id: params?.id, "responses._id": data.responseId },
            { $push: { "responses.$.comments": data.comment } },
            { new: true }
        );
            //    const response = await Question.updateOne({ _id: data?._id }, { $set: data })
        if (response) {
            return new Response('Question updated successfully', { status: 200 }); // OK
        } else {
            return new Response('Failed to update Question', { status: 500 }); // Internal Server Error
        }
    } catch (error) {
        return new Response(JSON.stringify(error.message), { status: 501 });
    }
}


