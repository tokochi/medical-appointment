import { connectToDB } from '@utils/database';
import Question from '@models/question';
import bcrypt from 'bcrypt'

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
    const userExists = await Question.findOne({ title: data?.title });
    if (userExists) { return new Response(JSON.stringify("Question already exist"), { status: 500 }); }
    try {
        // const hashedPassword = await bcrypt.hash(data?.password, 10);
        const question = new Question(data);
        await question.save();
        return new Response(JSON.stringify(question), { status: 201 })
    } catch (error) {
        console.log("🚀 ~ error:", error)
        return new Response(JSON.stringify("failed to insert question to DB", error), { status: 500 });
    }
}

// ****** Update *********
export async function PUT(req) {
    await connectToDB();
    const data = await req.JSON()
    try {
        const response = await Question.updateOne({ _id: data?._id }, { $set: data })
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

// ****** Delete *********
export async function DELETE(req) {
    await connectToDB();
    const data = await req.JSON()
    try {
        const response = await Question.deleteOne({ _id: data?._id })
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}

