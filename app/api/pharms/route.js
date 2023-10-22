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
    if (pharmExists) { return new Response(JSON.stringify("Pharm already exist"), { status: 501 }); }
    try {
        const pharm = new Pharm(data);
        const response = await pharm.save();
       return new Response(JSON.stringify(pharm), { status: 201 });
    } catch (error) {
        // Log the error details to the console for debugging
        console.error("Failed to insert pharm to DB:", error);

        // You can also log specific error messages if available
        if (error.message) {
            console.error("Error Message:", error.message);
        }

        return new Response(JSON.stringify("Failed to insert pharm to DB", error), { status: 500 });
    }
}
