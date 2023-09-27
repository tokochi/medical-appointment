import { connectToDB } from '@utils/database';
import Pharm from '@models/pharm';
import bcrypt from 'bcrypt'

// ****** Get All Data *********
export async function GET() {
    try {
        if (req.query.id) {
            const response = await Pharm.findOne({ _id: req.query.id });
            return new Response(JSON.stringify(response), { status: 200 });
        } else {
            const response = await Pharm.find();
            return new Response(JSON.stringify(response), { status: 200 });
        }
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
// ****** ADD New Pharm *********
export async function POST(req) {
    const data = await req.JSON() 
    try {  
        await connectToDB();
        const pharm = new Pharm(data);
        await pharm.save();
        return new Response(JSON.stringify(pharm), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

// ****** Update *********
export async function PUT(req) {
    const data = await req.JSON()
    try {
        const response = await Pharm.updateOne({ _id: data._id }, { $set: data })
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

// ****** Delete *********
export async function DELETE(req) {
    const data = await req.JSON()
    try {
        const response = await Pharm.deleteOne({ _id: data._id })
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

