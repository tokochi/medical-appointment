import { connectToDB } from '@utils/database';
import Company from '@models/company';

// ****** Get one Data *********
export async function GET(req, { params }) {
    await connectToDB();
    try {
        if (!params?.id) {
            return new Response('Missing ID parameter', { status: 400 }); // Bad Request
        }
        const response = await Company.findOne({ _id: params?.id });
        if (response.ok) {
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
        const response = await Company.updateOne({ _id: params?.id }, { $set: data })
        if (response.acknowledged === true && response.modifiedCount === 1) {
            return new Response(JSON.stringify(response), { status: 200 }); // OK
        } else {
            return new Response('Failed to update company', { status: 500 }); // Internal Server Error
        }
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

// ****** Delete *********
export async function DELETE(req, { params }) {
    await connectToDB();
    try {
        if (!params?.id) {
            return new Response('Missing ID parameter', { status: 400 }); // Bad Request
        }
        const response = await Company.deleteOne({ _id: params?.id })
        if (response.ok) {
            return new Response(JSON.stringify(response), { status: 200 }); // OK
        } else {
            return new Response('Failed to update user', { status: 500 }); // Internal Server Error
        }
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
