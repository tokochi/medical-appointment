import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log('MongoDB is already connected ...');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "medical_app",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true; // Set isConnected to true when the connection is established
        console.log("🚀 ~ MongoDB connected ....");
    } catch (error) {
        console.log("🚀 ~ MongoDB error:", error);
    }
};




