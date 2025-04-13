import userModel from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
  }

// route for user login
const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User doesn't exists"})
        }
        const isMatch=await bcrypt.compare(password,user.password);

        if(isMatch){
            const token=createToken(user._id);
            res.json({success:true,token})
        }
        else{
            return res.json({success:false,message:"Invalid password"})
        }
    }catch(error){

    }
}

// route for user registration

const registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body; // fetching from req.body
        // check if the user is already aexists or not 
        const exists=await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }
        // validation email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please Enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Please Enter strong password"})
        }
        //hashing user password
        const salt=await bcrypt.genSalt(10) // larger number larger time to encrypt
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new userModel({
            name,
            email,
            password:hashedPassword,
        })
        // new user wil saved to database
        const user=await newUser.save()
        const token=createToken(user._id);

        res.json({success:true,token});


    }catch(err){
        console.log(err);
        res.json({success:false,message:"Something went wrong"})
    }
}

// route for admin login

const adminLogin=async(req,res)=>{

}

export {loginUser,registerUser,adminLogin};