import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from '@utils/database';
import User from '@models/user';
import bcrypt from 'bcrypt'
import Doctor from '@models/doctor';
import Admin from '@models/admin';

export const options = {
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
                await connectToDB();
                if (!credentials?.email || !credentials?.password) { throw new Error('empty credentials!! ') }
                const user = await User.findOne({ email: credentials?.email });
                if (!user || !user?.password) {
                    throw new Error('User not Found in db !! ')
                }
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                )
                if (!isCorrectPassword) {
                    throw new Error('Invalid Password');
                }
              await User.updateOne({ email: credentials?.email }, { $set: { lastLogin: Date.now() } })
                return user
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
                await connectToDB();
                if (!credentials?.email || !credentials?.password) { throw new Error('empty credentials!! ') }
                const user = await Admin.findOne({ email: credentials?.email });
                if (!user || !user?.password) {
                    throw new Error('User not Found in db !! ')
                }
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                )
                if (!isCorrectPassword) {
                    throw new Error('Invalid Password');
                }
                await Admin.updateOne({ email: credentials?.email }, { $set: { lastLogin: Date.now() } })
                return user
            }
        }),
        CredentialsProvider({
            id: "doctor-login",
            name: "doctor-login",
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials, req) {
                await connectToDB();
                if (!credentials?.email || !credentials?.password) { throw new Error('empty credentials!! ') }
                const user = await Doctor.findOne({ email: credentials?.email });
                if (!user) {
                    throw new Error('User not Found in db !! ')
                }
                await Doctor.updateOne({ email: credentials?.email }, { $set: { lastLogin: Date.now() } })
                return user
            }
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            const sanitizedToken = Object.keys(token).reduce((p, c) => {
                // strip unnecessary properties
                if (
                    c !== "iat" &&
                    c !== "exp" &&
                    c !== "jti" &&
                    c !== "apiToken"
                ) {
                    return { ...p, [c]: token[c] }
                } else {
                    return p
                }
            }, {})
            return { ...session, user: sanitizedToken, apiToken: token.apiToken }
        },
        async jwt({ token, user, account, profile }) {
            if (typeof user !== "undefined") {
                // user has just signed in so the user object is populated
                return { ...token, ...user }
            }
            return token
        },
        async signIn({ profile, user, credentials }) {
            await connectToDB();
            if (profile) {
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
                    console.log("🚀 ~Error checking if user exists: ", error.message);
                    return false
                }
            }
            if (credentials) {
                
                
                return credentials
            }
        },
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
}