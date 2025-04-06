import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import adminRoutes from "./routes/adminRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import morgan from "morgan"


const app=express()

connectDB()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(morgan("dev"))
app.use("/users",userRoutes)
app.use("/admin",adminRoutes)

app.listen(5000,()=>{
    console.log("server started")
})