



const express = require("express");
const cookieParser = require("cookie-parser");


const app = express();

// require routes
const userRouter = require("./routes/auth.routes.js");










app.use(express.json())
app.use(cookieParser());



// use routes
app.use("/api/auth", userRouter);





module.exports = app;

