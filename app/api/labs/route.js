import { connectToDB } from '@utils/database';
import Lab from '@models/lab';


// ****** Get All Data *********
export async function GET(req) {
    await connectToDB();
    try {
    const response = await Lab.find();
            return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 501 });
    }
}
// ****** ADD New Lab *********
export async function POST(req) {
    await connectToDB();
    const data = await req.json()
    const labExists = await Lab.findOne({ name: data?.name });
    if (labExists) { return new Response(JSON.stringify("Lab already exist"), { status: 500 }); }
    try {
        // const hashedPassword = await bcrypt.hash(data?.password, 10);
        const lab = new Lab(data);
        await lab.save();
        return new Response(JSON.stringify(lab), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify("failed to insert lab to DB", error), { status: 500 });
    }
}
