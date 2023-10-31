const bcrybtjs =require("bcryptjs")
const asynchandler=require("express-async-handler")
const jwt =require("jsonwebtoken")
const {validateloginuser,validateregisteruser,usermodel}=require("../model/Auth")
const { restart } = require("nodemon")




const loginuser =(asynchandler(
    async (req,res)=>{

        const {error} =validateloginuser(req.body)
        if(error){
            return res.status(400).json(error.details[0].message);
        }

        const user =await usermodel.findOne({email:req.body.email})
        if(!user){
            return res.status(400).json({msg:"Invalid Email Or Password "})
        }
        const passwordmatch =await bcrybtjs.compare(req.body.password,user.password)
        if(!passwordmatch){
            return res.status(400).json({msg:"Invalid Email Or Password "})

        }
        const token =await jwt.sign({id:user._id,isadmin:user.isadmin},"DFGDFGDFGG",{expiresIn:"1d"});
        const {password,...other}=user._doc;
        res.status(200).json({...other,token})
    }
))


const registeruser =(asynchandler(
    async (req,res)=>{
        
        const {error} =validateregisteruser(req.body)
        if(error){
            return res.status(400).json(error.details[0].message);
        }
        const user =await usermodel.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({msg:"User Already Exist,Please login"})
        }
        const slat =await bcrybtjs.genSalt(6);
        req.body.password=await bcrybtjs.hash(req.body.password,slat)

        usermodel.create({
            email:req.body.email,
            name:req.body.name,
            password:req.body.password
        })
        res.status(201).json({msg:"You Registerd Successfully,Please Login"})

    }
))


module.exports={
    loginuser,registeruser
}

