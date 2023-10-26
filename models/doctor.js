import { Schema, model, models, Types } from 'mongoose';
const { v4: uuidv4 } = require('uuid');
// *********** Schema **********
const messageSchema = new Schema({
    id: {
        type: Types.ObjectId,
        default: Types.ObjectId,
    },
    date: { type: Date, default: Date.now },
    title: String,
    text: String,
    status: {
        type: Boolean,
        default: false
    },
    files: [],
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
const doctorSchema = new Schema({
    avatar: {
        type: [String],
        default: [
            "/images/avatar-doctor-male.webp",
            "/images/avatar-doctor-female.webp"
        ]
    },
    email: {
        type: String,
        // unique: [true, 'Email already exists!'],
        // required: [true, 'Email is required!']
    },
    name: String,
    birthDate: { type: Date, default: Date.now },
    title: {
        text: String,
        value: String
    },
    speciality: {
        value: String,
        text: String
    },
    gender: {
        value: String,
        text: String
    },
    sessionAvrgTime: {
        // Define the appropriate type for "sessionAvrgTime" (e.g., Number, Object) based on your data structure.
    },
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
    payment: {
        cash: Boolean,
        card: Boolean,
        check: Boolean
    },
    otherServices: {
        isFullTimeOpen: Boolean,
        insurance: Boolean,
        homeVisits: Boolean
    },
    googleMap: {
        lat: Number,
        lng: Number
    },
    specialities: [
        // Define the appropriate type for "specialities" (e.g., String, Array) based on your data structure.
    ],
    services: [
        // Define the appropriate type for "services" (e.g., String, Array) based on your data structure.
    ],
    officePics: [
        // Define the appropriate type for "officePics" (e.g., String, Array) based on your data structure.
    ],
    proofPics: [
        // Define the appropriate type for "proofPics" (e.g., String, Array) based on your data structure.
    ],
    facebook: String,
    instagram: String,
    whatsapp: String,
    workTime: [],
    password: String,
    isDoctor: {
        type: Boolean,
        default: true
    },
    questions: [
        {
            type: Schema.ObjectId,
            ref: 'Question'
        }
    ],
    subscription: {},
    desc: String,
    linkdin: String,
    inbox: [messageSchema],
    notifications: [String],
    notificationsList: [],
    isVerified: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: { type: Date },
    verifyToken: String,
    verifyTokenExpiry: { type: Date },
    verifyPinCode: Number,
    verifyPinCodeExpiry: { type: Date },
    lastLogin: { type: Date },
})
const Doctor = models?.doctor || model("doctor", doctorSchema);
export default Doctor;