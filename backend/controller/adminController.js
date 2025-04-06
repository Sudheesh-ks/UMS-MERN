import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import { httpStatus } from "../constants/httpStatus.js"

export const getallUsers=async(req,res)=>{
    try{
        const users=await User.find().select("-password")
        res.status(httpStatus.OK).json({success:true,users})
    }catch(err){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({success:false,message:err.message})
    }
}

export const addUser=async(req,res)=>{
    try{
        const{password,...userData}=req.body
        const hashedPassword=await bcrypt.hash(password,10)

        const newUser=await User.create({...userData,password:hashedPassword})
        res.status(httpStatus.OK).json({success:true,user:newUser})
    }catch(err){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({success:false,message:err.message})
    }
}

export const deleteUser=async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(httpStatus.OK).json({success:true,message:"User Deleted"})
    }catch(err){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({success:false,message:err.message})
    }
}

export const updateUser=async(req,res)=>{
    try{
        const {id}=req.params
        const userData=req.body
        console.log(id)
        console.log("userdata",userData)
        const user=await User.findById(id)
    
        if(!user){
           return res.status(httpStatus.NOT_FOUND).json({success:false,message:"User not found"})
        }
    
        if(userData.username){
            const isUsernameExist=await User.findOne({username:userData.username,_id:{$ne:id}})
            if(isUsernameExist){
                return res.status(httpStatus.BAD_REQUEST).json({success:false,message:"Username already exists"})
            }
        }
    
        if(userData.email){
            const isEmailExist=await User.findOne({email:userData.email,_id:{$ne:id}})
            if(isEmailExist){
                return res.status(httpStatus.BAD_REQUEST).json({success:false,message:"Email already exists"})
            }
        }
    
        const updatedUser=await User.findByIdAndUpdate(id,userData,{new:true})
        res.status(httpStatus.OK).json({success:true,user:updatedUser})
    }catch(err){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({success:false,message:err.message})
    }
}