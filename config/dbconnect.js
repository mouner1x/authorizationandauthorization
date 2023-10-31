const mongoose =require("mongoose");
const dotenv =require("dotenv").config({path:"config.env"})
const db_url=process.env.db_url;
const dbconnect=()=>{
    mongoose.connect(db_url).then(()=>{
        console.log("Database Connected !!")
    }).catch((error)=>{
        console.log(error)
    })
}
module.exports={
      dbconnect
}