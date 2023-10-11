import { Schema, model, models } from 'mongoose';

// *********** Schema **********
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
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!']
    },
    name: String,
    birthDate: { type: Date, default: Date.now },
    title: {
        text: String,
        value: String
    },
    gender: {
        value: String,
        text: String
    },
    speciality: {
        // Define the appropriate type for "speciality" (e.g., String, Array, or Object) based on your data structure.
    },
    sessionAvrgTime: {
        // Define the appropriate type for "sessionAvrgTime" (e.g., Number, Object) based on your data structure.
    },
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
    workTime: [
        {
            id: Number,
            state: String,
            dayAR: String,
            day: String,
            from: String,
            to: String
        }
    ],
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
    inbox: [],
    notificationsList: [],
    date: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date
    }
})
const Doctor = models?.doctor || model("doctor", doctorSchema);
export default Doctor;