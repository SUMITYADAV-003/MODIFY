const express = require("express");
const authController = require("../controllers/auth.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");

const userRoute = express.Router();



userRoute.post("/register", authController.registerUser);
userRoute.post("/login", authController.loginUser);
userRoute.get("/get-me", authMiddleware.authuser,authController.getMe);
userRoute.get("/logout", authMiddleware.authuser,authController.logOutUser);


















module.exports = userRoute;