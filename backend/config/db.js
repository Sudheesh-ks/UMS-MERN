import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(MONGO_URI)
        console.log(`Database Connected at ${conn.connection.host}`)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}