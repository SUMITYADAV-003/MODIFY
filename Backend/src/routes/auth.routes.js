const { Router } = require("express");
const AuthController = require("../controller/auth.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");

const router = Router()




router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.get("/get-me",authMiddleware.authUser, AuthController.getMe);




module.exports = router;