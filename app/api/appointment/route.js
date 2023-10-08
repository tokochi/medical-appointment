import { connectToDB } from '@utils/database';
import Appointment from '@models/appointment';
import bcrypt from 'bcrypt'

// ****** Get All Data *********
export async function GET(req) {
    await connectToDB();
    try {
        const response = await Appointment.find();
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 501 });
    }
}

// ****** ADD New Appointment *********
export async function POST(req) {
    await connectToDB();
    const data = await req.json()
    try {
        const appointment = new Appointment(data);
        await appointment.save();
        return new Response(JSON.stringify(appointment), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify("failed to insert appointment to DB", error), { status: 500 });
    }
}
