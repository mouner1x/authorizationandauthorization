const mongoose =require("mongoose")
const schema = mongoose.Schema;
const joi =require("joi")
const userschema =new schema({
    name:{
        type:String,
        min:4,
        max:20,
        required:true,
    },
    email:{
        type:String,
        min:6,
        unique:true,
        required:true
    },
    password:{
        type:String,
        min:8,
        required:true
    },
    isadmin:{
        type:Boolean,
        default:false
    }
})


const usermodel =mongoose.model("user",userschema)

function validateloginuser(obj){
    const schema =joi.object({


        email:joi.string().min(6).trim().required(),
        password:joi.string().trim().min(8).required()
    })
    return schema.validate(obj)
}
function validateregisteruser(obj){
    const schema =joi.object({


        email:joi.string().min(6).trim().required(),
        password:joi.string().trim().min(8).required(),
        name:joi.string().min(4).max(20).required()
    })
    return schema.validate(obj)
}

module.exports={
    usermodel,validateloginuser,validateregisteruser
}