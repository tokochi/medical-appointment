import { connectToDB } from '@utils/database';
import Lab from '@models/lab';
import bcrypt from 'bcrypt'

// ****** Get All Data *********
export async function GET() {
    try {
        if (req.query.id) {
            const response = await Lab.findOne({ _id: req.query.id });
            return new Response(JSON.stringify(response), { status: 200 });
        } else {
            const response = await Lab.find();
            return new Response(JSON.stringify(response), { status: 200 });
        }
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
// ****** ADD New Lab *********
export async function POST(req) {
    const data = await req.JSON() 
    try {  
        await connectToDB();
        const lab = new Lab(data);
        await lab.save();
        return new Response(JSON.stringify(lab), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

// ****** Update *********
export async function PUT(req) {
    const data = await req.JSON()
    try {
        const response = await Lab.updateOne({ _id: data._id }, { $set: data })
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

// ****** Delete *********
export async function DELETE(req) {
    const data = await req.JSON()
    try {
        const response = await Lab.deleteOne({ _id: data._id })
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

