import { connectToDB } from '@utils/database';
const moment = require('moment');
import { NextResponse } from 'next/server'
import Doctor from '@models/doctor';
import { parse } from 'url';
import { redirect } from "next/navigation";
// ****** ADD New User *********
export async function GET(req) {
    const parsedUrl = parse(req.url, true);
    const { query } = parsedUrl;
    const id = query.id;
    const URLtoken = query.token;

    await connectToDB();

    try {
        if (!URLtoken || !id) {
            console.log("🚀 ~  Incorrect Token");
            return NextResponse.redirect(`${process.env.URL}/verifyToken/error?id=${id}`);
        }

        const user = await Doctor.findOne({ _id: id });

        if (!user) {
            console.log("🚀 ~  User not found in DB");
            return NextResponse.redirect(`${process.env.URL}/verifyToken/error?id=${id}`);
        }

        if (user?.isVerified) {
            return NextResponse.redirect(`${process.env.URL}/verifyToken?id=${id}`);
        }

        const token = user?.verifyToken;
        const tokenExpireTime = moment(user?.verifyTokenExpiry);
        const currentTime = moment();

        if (token !== URLtoken) {
            console.log("🚀 ~  Incorrect Token");
            return NextResponse.redirect(`${process.env.URL}/verifyToken/error?id=${id}`);
        }

        if (tokenExpireTime.isBefore(currentTime)) {
            console.log("🚀 ~  Token code expired");
            return NextResponse.redirect(`${process.env.URL}/verifyToken/error?id=${id}`);
        }

        const response = await Doctor.updateOne({ _id: id }, { $set: { isVerified: true, verifyToken: null, verifyTokenExpiry: null } });

        if (response.acknowledged === true && response.modifiedCount === 1) {
            return NextResponse.redirect(`${process.env.URL}/verifyToken?id=${id}`);
        } else {
            return NextResponse.redirect(`${process.env.URL}/verifyToken/error?id=${id}`);
        }
    } catch (error) {
        console.log("failed to verify token code");
        return NextResponse.redirect(`${process.env.URL}/verifyToken/error?id=${id}`);
    }
}
