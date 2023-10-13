import { connectToDB } from '@utils/database';
import User from '@models/user';
import bcrypt from 'bcrypt'

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
        const response = await User.findByIdAndUpdate(
            params?.id,
            { $pull: { inbox: { _id: data._id } }  },
            { new: true }
        );
        //    const response = await User.updateOne({ _id: data?._id }, { $set: data })
        if (response) {
            return new Response('User updated successfully', { status: 200 }); // OK
        } else {
            return new Response('Failed to update User', { status: 500 }); // Internal Server Error
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
        const response = await User.deleteOne({ _id: params?.id })
        if (response) {
            return new Response('User Delete successfully', { status: 200 }); // OK
        } else {
            return new Response('Failed to Delete User', { status: 500 }); // Internal Server Error
        }
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
