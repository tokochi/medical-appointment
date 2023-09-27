import { connectToDB } from '@utils/database';
import Doctor from '@models/doctor';


// ****** Get All Data *********
export async function GET() {
    try {
        if (req.query.id) {
            const response = await Doctor.findOne({ _id: req.query.id });
            return new Response(JSON.stringify(response), { status: 200 });
        } else {
            const response = await Doctor.find();
            return new Response(JSON.stringify(response), { status: 200 });
        }
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
// ****** ADD New Doctor *********
export async function POST(req) {
    const data = await req.JSON() 
    try {  
        await connectToDB();
        const doctor = new Doctor(data);
        await doctor.save();
        return new Response(JSON.stringify(doctor), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

// ****** Update *********
export async function PUT(req) {
    const data = await req.JSON()
    try {
        const response = await Doctor.updateOne({ _id: data._id }, { $set: data })
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

// ****** Delete *********
export async function DELETE(req) {
    const data = await req.JSON()
    try {
        const response = await Doctor.deleteOne({ _id: data._id })
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

