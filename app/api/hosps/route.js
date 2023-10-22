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
        const hosp = new Hosp(data);
        const response = await hosp.save();
  return new Response(JSON.stringify(hosp), { status: 201 });
    } catch (error) {
        // Log the error details to the console for debugging
        console.error("Failed to insert lab to DB:", error);

        // You can also log specific error messages if available
        if (error.message) {
            console.error("Error Message:", error.message);
        }

        return new Response(JSON.stringify("Failed to insert pharm to DB", error), { status: 500 });
    }
}
