const { Router } = require("express");
const AuthController = require("../controller/auth.controller.js");

const router = Router()




router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);




module.exports = router;