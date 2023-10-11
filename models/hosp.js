import { Schema, model, models } from 'mongoose';

// *********** Schema **********
const hospSchema = new Schema({
    title: {},
    admins: [],
    address: {
        street: String,
        wilaya: {},
        daira: {},
        commune: {},
    },
    phone: { line1: String, line2: String, mobile: String },
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
    desc: String,
    facebook: String,
    instagram: String,
    whatsapp: String,
    linkdin: String,
    googleMap: {},
    name: {
        type: String,
        unique: [true, 'name already exists!'],
        required: [true, 'name is required!']
    },
    date: { type: Date, default: Date.now },
})
const Hosp = models.hosp || model("hosp", hospSchema);
export default Hosp;