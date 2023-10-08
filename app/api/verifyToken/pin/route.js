import { connectToDB } from '@utils/database';
import User from '@models/user';
import Appointment from '@models/appointment';
const moment = require('moment');
import { NextResponse } from 'next/server'
// ****** ADD New User *********
export async function POST(req) {
    await connectToDB();
    try {
        const data = await req.json()
        if (!data) {
            return new Response('Empty request body', { status: 400 }); // Bad Request
        }
        const user = await User.findOne({ _id: data?.user.id });
        const tokenExpireTime = moment(user?.verifyPinCodeExpiry);
        const currentTime = moment();
        if (tokenExpireTime.isBefore(currentTime)) {
            console.log("🚀 ~  Token code expired")
            return NextResponse.json({ message: "Token code expired", success: false }, { status: 500 });
        }
        if (user?.verifyPinCode === Number.parseInt(data?.pinCode)) {
            const appointment = new Appointment(data);
            await appointment.save();
            return NextResponse.json(appointment, { status: 201 })
        } else {
            console.log("🚀 ~  token code Incorrect")
            return NextResponse.json({ message: "token code Incorrect", success: false }, { status: 500 });
        }
    }
    catch (error) {
        console.log("failed to verify token code")
        return new NextResponse.json({ message: "failed to verify token code", success: false }, { status: 500 });
    }
}


// import { connectToDB } from '@utils/database';
// import User from '@models/user';
// import Appointment from '@models/appointment';
// import { NextResponse } from 'next/server'
// import moment from "moment";

// // ****** ADD New User *********
// export async function POST(req) {
//     console.log("🚀🚀 🚀🚀🚀🚀🚀🚀")
//     await connectToDB();
//     try {
//         const data = await req.json()
//         console.log("🚀 ~ data:", data)
//         if (!data) {
//             return new Response('Empty request body', { status: 400 }); // Bad Request
//         }
//         const user = await User.findOne({ _id: data?.user.id });
//         const tokenExpireTime = moment(user?.verifyPinCodeExpiry);
//         const currentTime = moment();
//         console.log("🚀 ~ currentTime:", currentTime)
//         if (tokenExpireTime.isBefore(currentTime)) {
//             console.log("🚀 ~  Token code expired")
//             return NextResponse.json({ message: "Token code expired", success: false }, { status: 500 });
//         }
//         if (user?.verifyPinCode === Number.parseInt(data?.pinCode)) {
//             const appointment = new Appointment(data);
//             await appointment.save();
//             NextResponse.json(appointment, { status: 201 })
//         } else {
//             console.log("🚀 ~  token code Incorrect")
//             return NextResponse.json({ message: "token code Incorrect", success: false }, { status: 500 });
//         }
//     }
//     catch (error) {
//         console.log("failed to verify token code")
//         return new NextResponse.json({ message: "failed to verify token code", success: false }, { status: 500 });
//     }
// }
