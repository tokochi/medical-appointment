import { connectToDB } from '@utils/database';
import Appointment from '@models/appointment';
import bcrypt from 'bcrypt';
// ****** Get one Data *********
export async function GET(req,{params}) {
    await connectToDB();
    try {
        if (!params?.id) {
            return new Response('Missing ID parameter', { status: 400 }); // Bad Request
        }
        const response = await Appointment.findOne({
            $or: [{ _id: params?.id }, { _id: params?.id }],
        });
;
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
    const data = await req.json();
    try {
        if (!params?.id) {
            return new Response('Missing ID parameter', { status: 400 }); // Bad Request
        }
        if (!data) {
            return new Response('Empty request body', { status: 400 }); // Bad Request
        }

        // Check if both oldPassword and password exist in the data
        if (data?.oldPassword) {
            // Fetch the user by ID
            const user = await Appointment.findOne({ _id: params?.id });

            if (!user) {
                return new Response('User not found', { status: 404 }); // Not Found
            }

            // Verify that the oldPassword matches the stored hashed password
            const passwordMatch = await bcrypt.compare(data?.oldPassword, user?.password);

            if (!passwordMatch) {
                return new Response('Old password is incorrect', { status: 400 }); // Bad Request
            }
            // Hash the new password
            const hashedPassword = await bcrypt.hash(data?.password, 10);

            // Update the user's password with the hashed new password
            const response = await Appointment.updateOne({ _id: params?.id }, { $set: { password: hashedPassword } });

            if (response.acknowledged === true && response.modifiedCount === 1) {
                return new Response('User updated successfully', { status: 200 }); // OK
            } else {
                return new Response('Failed to update user', { status: 500 }); // Internal Server Error
            }
        } else {
            // If oldPassword and password are not provided, proceed with a regular update
            const response = await Appointment.updateOne({ _id: params?.id }, { $set: data });
            if (response.acknowledged === true && response.modifiedCount === 1) {
                return new Response("User Updated Successfully", { status: 200 }); // OK
            } else {
                return new Response('Failed to update user', { status: 500 }); // Internal Server Error
            }
        }
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

// ****** Delete *********
export async function DELETE(req, { params }) {
    await connectToDB();
    const data = await req.json()
    try {
        if (!params?.id) {
            return new Response('Missing ID parameter', { status: 400 }); // Bad Request
        }
        const response = await Appointment.deleteOne({ _id: params?.id })
        if (response.acknowledged === true && response.deletedCount === 1) {
            return new Response("User Deleted Successfully", { status: 200 }); // OK
        } else {
            return new Response('Failed to Deleted User', { status: 500 }); // Internal Server Error
        }
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
