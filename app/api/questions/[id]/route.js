import { connectToDB } from '@utils/database';
import Question from '@models/question';
import bcrypt from 'bcrypt'

// ****** Get All Data *********
export async function GET(req,{params}) {
    await connectToDB();
    try {
        if (params?.id) {
            const response = await Question.findOne({ _id: params?.id });
            return new Response(JSON.stringify(response), { status: 200 });
        }
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 501 });
    }
}
