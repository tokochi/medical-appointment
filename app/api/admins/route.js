import { connectToDB } from '@utils/database';
import Admin from '@models/admin';
import bcrypt from 'bcrypt'
import { parse } from 'url';
// ****** Get All Data *********
export async function GET(req) {
    const { query } = parse(req.url, true);
    await connectToDB();
    try {
        if (query?.id) {
            const response = await Admin.findOne({ email: query?.id });
            return new Response(JSON.stringify(response), { status: 200 });
        } else {
            const response = await Admin.find();
            return new Response(JSON.stringify(response), { status: 200 });
        }
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 501 });
    }
}
// ****** ADD New Admin *********
export async function POST(req) {
    await connectToDB();
    const data = await req.json()
    if (data?.adminKey !== process.env.SECRET_ADMIN_KEY) { return new Response(JSON.stringify("Admin Key Corrupt"), { status: 500 }); }
    const adminExists = await Admin.findOne({ email: data?.email });
    if (adminExists) { return new Response(JSON.stringify("Admin already exist"), { status: 500 }); }
    try {
        const hashedPassword = await bcrypt.hash(data?.password, 10);
        const admin = new Admin({ ...data, password: hashedPassword });
        await admin.save();
        return new Response(JSON.stringify(admin), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify("failed to insert admin to DB", error), { status: 500 });
    }
}

// ****** Update *********
export async function PUT(req) {
    await connectToDB();
    const data = await req.JSON()
    try {
        const response = await Admin.updateOne({ _id: data?._id }, { $set: data })
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

// ****** Delete *********
export async function DELETE(req) {
    await connectToDB();
    const data = await req.JSON()
    try {
        const response = await Admin.deleteOne({ _id: data?._id })
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

