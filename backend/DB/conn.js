import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDB= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to mongoDB");
        
    } catch (error) {
        console.log("err while connecting to DB: ",error);
    }
}
export default connectDB;