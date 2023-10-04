import { Schema, model, models } from 'mongoose';

// *********** Schema **********
const companySchema = new Schema({
    name: "string",
    address: {
        street: "string",
        wilaya: {},
        daira: {},
        commune: {},
    },
    phone: {},
    avatar: [],
    desc: "string",
    site: "string",
    rc: "string",
    if: "string",
    facebook: "string",
    instagram: "string",
    whatsapp: "string",
    files:{},
    email: "string",
    date: { type: Date, default: Date.now },
})
const Company = models.company || model("company", companySchema);
export default Company;