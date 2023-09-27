import { Schema, model, models } from 'mongoose';

// *********** Schema **********
const userSchema = new Schema({
    name: "string",
    gender: {},
    password: "string",
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
    files:{},
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!']
    },
    date: { type: Date, default: Date.now },
})
const User = models.user || model("user", userSchema);
export default User;