import { Schema, model, models } from 'mongoose';

// *********** Schema **********
const adminSchema = new Schema({
    name: "string",
    gender: {},
    password: "string",
    isAdmin: {
        type: Boolean,
        default:true
    },
    address: {
        street: "string",
        wilaya: {},
        daira: {},
        commune: {},
    },
    phone: {},
    avatar: [],
    desc: "string",
    facebook: "string",
    instagram: "string",
    whatsapp: "string",
    role: "string",
    access:[],
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!']
    },
    date: { type: Date, default: Date.now },
    lastLogin: { type: Date },
})
const Admin = models.admin || model("admin", adminSchema);
export default Admin;