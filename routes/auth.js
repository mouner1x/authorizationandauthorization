const express=require("express");
const router =express.Router();

const { registeruser,loginuser } = require("../controller/auth");




router.post("/login",loginuser)



router.post("/register",registeruser)





module.exports={
    authpath:router
}