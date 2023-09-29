import { connectToDB } from '@utils/database';
import Admin from '@models/admin';
import bcrypt from 'bcrypt'

// ****** Get All Data *********
export async function GET(req) {
    await connectToDB();
    try {
        const response = await Admin.find();
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 501 });
    }
}

// ****** ADD New Admin *********
export async function POST(req) {
    await connectToDB();
    const data = await req.json()
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
