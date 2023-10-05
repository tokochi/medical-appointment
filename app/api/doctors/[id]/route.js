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
        const response = await Doctor.updateOne({ _id: data?._id }, { $set: data })
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
