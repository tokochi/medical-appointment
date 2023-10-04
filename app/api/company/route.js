import { connectToDB } from '@utils/database';
import Company from '@models/company';


// ****** Get All Data *********
export async function GET(req) {
    await connectToDB();
    try {
            const response = await Company.find();
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 501 });
    }
}
// ****** ADD New Company *********
export async function POST(req) {
    await connectToDB();
    const data = await req.json()
    const companyExists = await Company.findOne({ name: data?.name });
    if (companyExists) { return new Response(JSON.stringify("Company already exist"), { status: 500 }); }
    try {
        const company = new Company(data);
        await company.save();
        return new Response(JSON.stringify(company), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify("failed to insert company to DB", error), { status: 500 });
    }
}
