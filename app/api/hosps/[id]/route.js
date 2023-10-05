import { connectToDB } from '@utils/database';
import Hosp from '@models/hosp';
import bcrypt from 'bcrypt'

// ****** Get One Data *********
export async function GET(req, { params }) {
    await connectToDB();
    try {
        if (!params?.id) {
            return new Response('Missing ID parameter', { status: 400 }); // Bad Request
        }
        const response = await Hosp.findOne({ _id: params?.id });
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
        const response = await Hosp.updateOne({ _id: data?._id }, { $set: data })
        if (response.acknowledged === true && response.modifiedCount === 1) {
            return new Response('Hosp updated successfully', { status: 200 }); // OK
        } else {
            return new Response('Failed to update Hosp', { status: 500 }); // Internal Server Error
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
        const response = await Hosp.deleteOne({ _id: params?.id })
        if (response.acknowledged === true && response.deletedCount === 1) {
            return new Response('Hosp Deleted successfully', { status: 200 }); // OK
        } else {
            return new Response('Failed to Deleted Hosp', { status: 500 }); // Internal Server Error
        }
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
