import { connectToDB } from '@utils/database';
import { useStore } from "@context/serverStore";


// ****** Get Theme *********
export async function POST(req) {
    const data = await req.json()
    useStore.setState({ darkTheme: data })
    return new Response(JSON.stringify(data), { status: 200 });
}
