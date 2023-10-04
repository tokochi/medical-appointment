import { connectToDB } from '@utils/database';
import Pharm from '@models/pharm';


// ****** Get All Data *********
export async function GET(req) {
    await connectToDB();
    try {
    const response = await Pharm.find();
            return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 501 });
    }
}
// ****** ADD New Pharm *********
export async function POST(req) {
    await connectToDB();
    const data = await req.json()
    const pharmExists = await Pharm.findOne({ name: data?.name });
    if (pharmExists) { return new Response(JSON.stringify("Pharm already exist"), { status: 500 }); }
    try {
        // const hashedPassword = await bcrypt.hash(data?.password, 10);
        const pharm = new Pharm(data);
       await pharm.save()
        return new Response(JSON.stringify(pharm), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify("failed to insert pharm to DB", error), { status: 500 });
    }
}
