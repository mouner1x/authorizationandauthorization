const express=require("express");
const app=express();
const dotenv=require("dotenv");
dotenv.config({path:"config.env"});
const port =process.env.port;
const helmet =require("helmet")
const morgan =require("morgan");
const { dbconnect } = require("./config/dbconnect");
const {authpath} = require("./routes/auth");




dbconnect()
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))






app.use("/api/auth",authpath)







const routenotfound =(req,res,next)=>{
    res.status(404).json(`Not Found - ${req.originalUrl}`)
}


app.use(routenotfound)














app.listen(port,()=>{
    console.log(`server is runing on port ${port}`)
})




























