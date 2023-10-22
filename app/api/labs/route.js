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
        const lab = new Lab(data);
        const response = await lab.save();
      return new Response(JSON.stringify(lab), { status: 201 });
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
