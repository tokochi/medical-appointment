import { connectToDB } from '@utils/database';
import Doctor from '@models/doctor';
import bcrypt from 'bcrypt'

// ****** Get One Data *********
export async function GET(req, { params }) {
    await connectToDB();
    try {
        if (!params?.id) {
            return new Response('Missing ID parameter', { status: 400 }); // Bad Request
        }
        const response = await Doctor.findOne({ email: params?.id });
        if (response) {
            return new Response(JSON.stringify(response), { status: 200 }); // OK
        } else {
            return new Response('Failed to update user', { status: 500 }); // Internal Server Error
        }
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 501 });
    }
}
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
        let response;
        if (data?.message) {
            const { doctor, author } = data?.message;
            const currentTimestamp = Date.now();
            const lastMessage = await Doctor.findOne(
                { _id: doctor, 'inbox.author': author, }, { 'inbox.date': 1 })
                .sort({ 'inbox.date': -1 })
                .limit(1);
            if (lastMessage) {
                const lastMessageTimestamp = lastMessage.inbox[0].date;
                const timeDifference = currentTimestamp - lastMessageTimestamp;
                const timeLimit = 24 * 60 * 60 * 1000;
                if (timeDifference < timeLimit) {
           return new Response('Please wait before asking another question', { status: 203 })
                }
            }
            response = await Doctor.updateOne({ _id: doctor },
                { $push: { inbox: { $each: [data?.message], }, }, }
            );
        }
        else {
            response = await Doctor.updateOne({ _id: data?._id }, { $set: data })
        }
        if (response.acknowledged === true && response.modifiedCount === 1) {
            return new Response('Doctor updated successfully', { status: 200 }); // OK
        } else {
            return new Response('Failed to update Doctor', { status: 500 }); // Internal Server Error
        }
    } catch (error) {
        return new Response(JSON.stringify(error.message), { status: 500 });
    }
}

// ****** Delete *********
export async function DELETE(req, { params }) {
    await connectToDB();
    try {
        if (!params?.id) {
            return new Response('Missing ID parameter', { status: 400 }); // Bad Request
        }
        const response = await Doctor.deleteOne({ _id: params?.id })
        if (response.acknowledged === true && response.deletedCount === 1) {
            return new Response('Doctor Delete successfully', { status: 200 }); // OK
        } else {
            return new Response('Failed to Delete Doctor', { status: 500 }); // Internal Server Error
        }
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
