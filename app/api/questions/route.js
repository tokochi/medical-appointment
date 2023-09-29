import { connectToDB } from '@utils/database';



// ****** Get All Data *********
export async function GET(req) {
    await connectToDB();
    try {
            const response = await Question.find();
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 501 });
    }
}
// ****** ADD New Question *********
export async function POST(req) {
    await connectToDB();
    const data = await req.json()
    const questionExists = await Question.findOne({ title: data?.title });
    if (questionExists) { return new Response(JSON.stringify("Question already exist"), { status: 500 }); }
    try {
        const question = new Question(data);
        await question.save();
        return new Response(JSON.stringify(question), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify("failed to insert question to DB", error), { status: 500 });
    }
}
