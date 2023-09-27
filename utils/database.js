import mongoose from "mongoose";

let isConnected = false; // track the connection
export const connectToDB = async () => {


    mongoose.set('strictQuery', true);
    if (isConnected) { console.log('mongoDb is Already connected ...'); return; }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "medical_app",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }) 
        console.log("🚀 ~ MongoDb connected ....")
    } catch (error) {
        console.log("🚀 ~ MongoDb error:", error)
        
    }

}
