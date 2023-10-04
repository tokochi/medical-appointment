import { Schema, model, models } from 'mongoose';

// *********** Schema **********
const labSchema = new Schema({
    title: {},
    admins: [],
    address: {
        street: "string",
        wilaya: {},
        daira: {},
        commune: {},
    },
    phone: { line1: "string", line2: "string", mobile: "string" },
    avatar: [],
    payment: {},
    services: [],
    specialities: [],
    officePics: [],
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
    name: {
        type: String,
        unique: [true, 'name already exists!'],
        required: [true, 'name is required!']
    },
    date: { type: Date, default: Date.now },
})
const Lab = models.lab || model("lab", labSchema);
export default Lab;