import { connectToDB } from '@utils/database';
import Error from '@models/error';
// ****** Get All Data *********
export async function GET(req) {
    await connectToDB();
    try {
            const response = await Error.find();
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 501 });
    }
}
// ****** ADD New Error *********
export async function POST(req) {
    await connectToDB();
    const data = await req.json()
 try {
        const error = new Error(data);
        const response = await error.save();
        console.log("🚀 ~ response:", response)
        return new Response(JSON.stringify(error), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify("failed to insert error to DB", error), { status: 500 });
    }
}
