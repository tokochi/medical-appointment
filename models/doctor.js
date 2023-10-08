import { Schema, model, models } from 'mongoose';

// *********** Schema **********
const doctorSchema = new Schema({
    name: "string",
    title:{},
    speciality: {},
    password:"string",
    sessionAvrgTime:{},
    address: {
        street: "string",
        wilaya: {},
        daira: {},
        commune: {},
    },
    phone: { line1: "string", line2: "string", mobile: "string" },
    gender:  {},
    avatar: [],
    payment: {},
    workTime:[],
    specialities: [],
    services: [],
    officePics: [],
    proofPics: [],
    messages: [],
    questions: [{
        type: Schema.ObjectId,
        ref: 'Question', // Reference the Doctor model
    }],
    otherServices: {
        isFullTimeOpen: "boolean",
        insurance: "boolean",
        homeVisits: "boolean",
    },
    subscription: {},
    desc: "string",
    facebook: "string",
    instagram: "string",
    whatsapp: "string",
    linkdin: "string",
    googleMap: {},
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!']
    },
    date: { type: Date, default: Date.now },
    lastLogin: { type: Date },
})
const Doctor = models?.doctor || model("doctor", doctorSchema);
export default Doctor;