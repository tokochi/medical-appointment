import { Schema, model, models } from 'mongoose';

// *********** Schema **********
const companySchema = new Schema({
    name: String,
    address: {
        street: String,
        wilaya: {},
        daira: {},
        commune: {},
    },
    phone: {},
    avatar: [],
    desc: String,
    site: String,
    rc: String,
    if: String,
    facebook: String,
    instagram: String,
    whatsapp: String,
    files:{},
    email: String,
    date: { type: Date, default: Date.now },
})
const Company = models.company || model("company", companySchema);
export default Company;