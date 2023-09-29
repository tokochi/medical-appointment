import { connectToDB } from '@utils/database';
import Hosp from '@models/hosp';


// ****** Get All Data *********
export async function GET(req) {
    await connectToDB();
    try {
    const response = await Hosp.find();
            return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 501 });
    }
}
// ****** ADD New Hosp *********
export async function POST(req) {
    await connectToDB();
    const data = await req.json()
    const hospExists = await Hosp.findOne({ name: data?.name });
    if (hospExists) { return new Response(JSON.stringify("Hosp already exist"), { status: 500 }); }
    try {
        // const hashedPassword = await bcrypt.hash(data?.password, 10);
        const hosp = new Hosp(data);
        await hosp.save();
        return new Response(JSON.stringify(hosp), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify("failed to insert hosp to DB", error), { status: 500 });
    }
}
