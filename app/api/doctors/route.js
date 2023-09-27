import { connectToDB } from '@utils/database';
import Doctor from '@models/doctor';
import bcrypt from 'bcrypt'

// ****** Get All Data *********
export async function GET(req) {
    await connectToDB();
    try {
    const response = await Doctor.find();
            return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 501 });
    }
}
// ****** ADD New Doctor *********
export async function POST(req) {
    await connectToDB();
    const data = await req.json()
    const userExists = await Doctor.findOne({ email: data?.email });
    if (userExists) { return new Response(JSON.stringify("Doctor already exist"), { status: 500 }); }
    try {
        // const hashedPassword = await bcrypt.hash(data?.password, 10);
        const doctor = new Doctor(data);
        await doctor.save();
        return new Response(JSON.stringify(doctor), { status: 201 })
    } catch (error) {
        console.log("🚀 ~ error:", error)
        return new Response(JSON.stringify("failed to insert doctor to DB", error), { status: 500 });
    }
}

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
        if (response.ok) {
            return new Response(JSON.stringify(response), { status: 200 }); // OK
        } else {
            return new Response('Failed to update user', { status: 500 }); // Internal Server Error
        }
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
