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
    from: {
        id: {
            type: Schema.ObjectId,
            ref: 'Doctor',
        },
        name: String,
        title: {
            text: String,
            value: String
        },
        speciality: {
            value: String,
            text: String
        }
    },
    // Other message fields
});

const userSchema = new Schema({
    name: String,
    birthDate: { type: Date, default: Date.now },
    gender: {
        value: String,
        text: String
    },
    password: String,
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
    avatar: {
        type: [String],
        default: ["/images/user-logo.webp"]
    },
    desc: String,
    facebook: String,
    instagram: String,
    whatsapp: String,
    healthInfo: {
        age: String,
        weight: String,
        height: String,
        chrnoDiseases: {
            type: Array,
            default: []
        },
        alergies: {
            type: Array,
            default: []
        },
        surgeries: {
            type: Array,
            default: []
        },
        inheritDiseases: {
            type: Array,
            default: []
        },
        vaccinations: {
            type: Array,
            default: []
        },
        examinations: {
            type: Array,
            default: []
        },
        bloodType: { text: String, value: String },
        questions: {
            ArticulationIssue: Boolean,
            hairLose: Boolean,
            skinDisease: Boolean,
            smoking: Boolean,
        },
    },
    inbox: [messageSchema],
    notifications: [String],
    notificationsList: [],
    googleMap: {
        lat: Number,
        lng: Number
    },
    isUser: {
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
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: { type: Date },
    verifyToken: String,
    verifyTokenExpiry: { type: Date },
    verifyPinCode: Number,
    verifyPinCodeExpiry: { type: Date },
    lastLogin: { type: Date },
    date: { type: Date, default: Date.now },
})
const User = models.user || model("user", userSchema);
export default User;