import { Schema, model, models, Types } from 'mongoose';

// *********** Schema **********
const messageSchema = new Schema({
    id: {
        type: Types.ObjectId,
        default: Types.ObjectId,
    },
    date: { type: Date, default: Date.now },
    title: String,
    text: String,
    files: [],
    status: {
        type: Boolean,
        default: false
    },
    from: {
        id: {
            type: Schema.ObjectId,
            ref: 'User',
        },
        name: String,
        email: String,
    },
    // Other message fields
});
const notificationSchema = new Schema({
    action: String,
    type: String,
    source: String,
    text: String,
    title: String,
    id: {
        type: Types.ObjectId,
        default: Types.ObjectId,
    },
    date: { type: Date, default: Date.now },
})
const adminSchema = new Schema({
    name: String,
    gender: {
        value: String,
        text: String
    },
    password: String,
    address: {
        street: String,
        postCode: String,
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
    inbox: [],
    notifications: [String],
    googleMap: {
        lat: Number,
        lng: Number
    },
    notificationsList: [notificationSchema],
    isAdmin: {
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
    inbox: [messageSchema],
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: { type: Date },
    verifyToken: String,
    verifyTokenExpiry: { type: Date },
    verifyPinCode: Number,
    verifyPinCodeExpiry: { type: Date },
    lastLogin: { type: Date },
    birthDate: { type: Date, default: Date.now },
    date: { type: Date, default: Date.now },
})
const Admin = models.admin || model("admin", adminSchema);
export default Admin;