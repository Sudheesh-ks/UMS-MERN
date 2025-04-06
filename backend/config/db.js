import mongoose from "mongoose";

export const connectDB=async()=>{
    try{
        const conn=await mongoose.connect("mongodb://127.0.0.1:27017/Mern_User_Auth")
        console.log(`Database Connected at ${conn.connection.host}`)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}