const mongoose=require("mongoose")
const jwt =require("jsonwebtoken")


function verifytoken(req,res,next){
    const authtoken =req.headers.token;
    if(!authtoken){
        return res.status(401).json({ msg: "No Token Provided, Please Login" });
    }
    try{
       const token = authtoken.split(" ")[1];
       const decoded = jwt.verify(token,"DFGDFGDFGG")
       req.user=decoded;
       next()
    }
    catch(error){
        return res.status(401).json({ msg: "Invalid Token" });

    }
}

function verifytokenandadmin(req,res,next){
    verifytoken(req,res,()=>{
        if(req.user.isadmin){
            next()
        }
        else{
            return res.status(401)

        }
    })
}