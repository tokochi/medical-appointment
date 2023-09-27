import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from '@utils/database';
import User from '@models/user';
import bcrypt from 'bcrypt'
import Doctor from '@models/doctor';
import Admin from '@models/admin';

const handler = NextAuth({
    site: 'http://localhost:3000',
    basePath: '/p/api/auth',
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                }
            }
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
        CredentialsProvider({
            id: "user-login",
            name: "user-login",
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials, req) {
                return credentials
            }
        }),
        CredentialsProvider({
            id: "admin-login",
            name: "admin-login",
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials, req) {
                return credentials
            }
        }),
    ],
    callbacks: {
        async session({ session, token,user }) {
            // store the user id from MongoDB to session
            const sessionUser = await Admin.findOne({ email: session.user.email });
            return { ...session, user: sessionUser, apiToken: token.apiToken };
        },
        async signIn({ profile, credentials }) {
            
   
            // if there no profile from google,facebook do credentials
            await connectToDB();
            if (!profile) {
                    let user = null
                    switch (credentials.type) {
                        case "doctor":
                            user = await Doctor.findOne({ email: credentials.email });
                            if (!user) {
                                throw new Error('User not Found in db !! ')
                            }
                            return true
                        case "admin":
                            if (!credentials?.email || !credentials?.password) { throw new Error('Email & password are required') }
                            user = await Admin.findOne({ email: credentials.email });
                            if (!user || !user?.password) {
                                throw new Error('User not Found in db !! ')
                            }
                            return true
                        case "user":
                            if (!credentials?.email || !credentials?.password) { throw new Error('Email & password are required') }
                            // Check if user credentials are correct
                             user = await User.findOne({ email: credentials.email });
                            if (!user || !user?.password) {
                                throw new Error('Invalid Login Credentials')
                            }
                            const isCorrectPassword = await bcrypt.compare(
                                credentials.password,
                                user.password
                            )
                            if (!isCorrectPassword) {
                                throw new Error('Invalid Password');
                            }
                            return true
                    }
            } else {
                try {
                    // check if user already exists
                    const userExists = await User.findOne({ email: profile.email });
                    // if not, create a new document and save user in MongoDB
                    if (!userExists) {
                        await User.create({
                            email: profile.email,
                            username: profile.name.replace(" ", "").toLowerCase(),
                            image: profile.picture,
                        });
                    }
                    return true
                } catch (error) {
                    console.log("Error checking if user exists: ", error.message);
                    return false
                }
            }
        },
    },
    session: {
        strategy: 'jwt'
    },
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }