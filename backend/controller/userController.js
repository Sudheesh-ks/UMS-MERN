import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cloudinary from "cloudinary"
import dotenv from "dotenv"
import User from "../models/userModel.js"
import { httpStatus } from "../constants/httpStatus.js"

dotenv.config()

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

export const register=async(req,res)=>{
    try {
        const {username,password,email}=req.body
        console.log(req.body)

        const existingUser=await User.findOne({email})

        if(existingUser){
           return res.status(httpStatus.BAD_REQUEST).json({success:false,message:"Email already exist"})
        }

        const hashedPassword=await bcrypt.hash(password,10)

        const newUser=await User.create({username,email,password:hashedPassword})

        const token=jwt.sign(
            {id:newUser._id,username,email},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        )

        res.status(httpStatus.OK).json({success:true,message:"User registered successfully",user:newUser,token})
    } catch (error) {
        console.log(error)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({success:false,message:error.message})
    }
}

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const newUser=await User.findOne({email})
        if(!newUser){
            return res.status(httpStatus.BAD_REQUEST).json({success:false,message:"Invalid Email"})
        }
        const isValidPassword=await bcrypt.compare(password,newUser.password)
        if(!isValidPassword){
            return res.status(httpStatus.BAD_REQUEST).json({success:false,message:"Invalid Password"})
        }

        const token = jwt.sign(
            { id: newUser._id, username:newUser.username, email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          )

         res.status(httpStatus.OK).json({success:true,message:"User login successfully",newUser,token})
    } catch (error) {
        console.log(error)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({success:false,message:error.message})
    }
}

export const updateUser=async(req,res)=>{
    try{
        const id=req.params.id
        const {username,email}=req.body
        let imageUrl=null

        if(req.file){
            imageUrl=`data:image/png;base64,${req.file.buffer.toString("base64")}`
        }

        const user=await User.findById(id)
        console.log(1)
        if(!user){
            console.log(2)
           return res.status(httpStatus.NOT_FOUND).json({success:false,message:"User not found"})
        }

        if(username){
            console.log(3)
            const isUsernameExist=await User.findOne({username,_id:{$ne:id}})
            if(isUsernameExist){
                console.log(4)
                return res.status(httpStatus.BAD_REQUEST).json({success:false,message:"Username already exists"})
            }
        }

        if(email){
            console.log(5)
            const isEmailExist=await User.findOne({_id:{$ne:id},email})
            if(isEmailExist){
                console.log(6)
                return res.status(httpStatus.BAD_REQUEST).json({success:false,message:"Email already exists"})
            }
        }

        console.log(username)
        console.log(id)
        console.log(email)

        const updatedUser=await User.findByIdAndUpdate(id,{username,email,avatar:imageUrl||user.avatar},{new:true}) 
        
        
        res.status(httpStatus.OK).json({success:true,message:"User Updated Successfully",user:updatedUser})

    }catch(err){
        console.log(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({success:false,message:err.message})
    }
}