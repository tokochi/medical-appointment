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
        const response = await Question.findByIdAndUpdate(
            params?.id,
            { $pull: { responses: { _id: data._id } }  },
            { new: true }
        );
        //    const response = await Question.updateOne({ _id: data?._id }, { $set: data })
        if (response) {
            return new Response('Question updated successfully', { status: 200 }); // OK
        } else {
            return new Response('Failed to update Question', { status: 500 }); // Internal Server Error
        }
    } catch (error) {
        return new Response(JSON.stringify(error.message), { status: 500 });
    }
}

