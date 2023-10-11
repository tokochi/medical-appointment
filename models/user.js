import { Schema, model, models } from 'mongoose';

// *********** Schema **********
const userSchema = new Schema({
    name: String,
    birthDate: { type: Date, default: Date.now },
    gender: {
        value: String,
        text: String
    },
    password: String,
    address: {
        street: String,
        wilaya: {
            value: String,
            text: String
        },
        daira: {
            value: String,
            text: String
        },
        commune: {
            value: String,
            text: String
        }
    },
    phone: {
        line1: String,
        line2: String,
        mobile: String
    },
    avatar: {
        type: [String],
        default: ["/images/user-logo.webp"]
    },
    desc: String,
    facebook: String,
    instagram: String,
    whatsapp: String,
    files: {},
    healthInfo: {},
    inbox: [],
    notifications: {
        users: Boolean,
        doctors: Boolean,
        posts: Boolean,
        questions: Boolean
    },
    googleMap: {
        lat: Number,
        lng: Number
    },
    notificationsList: [],
    isUser: {
        type: Boolean,
        default: true
    },
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!']
    },
    isVerified: {
        type: Boolean,
        default: false 
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: { type: Date },
    verifyToken: String,
    verifyTokenExpiry: { type: Date },
    verifyPinCode: Number,
    verifyPinCodeExpiry: { type: Date },
    lastLogin: { type: Date },
    date: { type: Date, default: Date.now },
})
const User = models.user || model("user", userSchema);
export default User;