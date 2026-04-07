const express = require("express"); 
const AuthController = require("../controller/auth.controller.js")


const userRouter = express.Router();


userRouter.post("/register",AuthController.registerUser);
userRouter.post("/login",AuthController.loginUser);









module.exports =  userRouter

