import { connectToDB } from '@utils/database';
import Doctor from '@models/doctor';


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
    const doctorExists = await Doctor.findOne({ email: data?.email });
    if (doctorExists) { return new Response(JSON.stringify("Doctor already exist"), { status: 500 }); }
    try {
        // const hashedPassword = await bcrypt.hash(data?.password, 10);
        const doctor = new Doctor(data);
        await doctor.save();
        return new Response(JSON.stringify(doctor), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify("failed to insert doctor to DB", error), { status: 500 });
    }
}
