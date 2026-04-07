const express = require("express"); 
const AuthController = require("../controller/auth.controller.js")
const authMiddleware = require("../middleware/auth.middleware.js");


const userRouter = express.Router();


userRouter.post("/register",AuthController.registerUser);
userRouter.post("/login",AuthController.loginUser);
userRouter.get("/get-me", authMiddleware.authUser, AuthController.getMe);
userRouter.get("/logout", authMiddleware.authUser, AuthController.logoutUser);









module.exports =  userRouter

