const express = require("express");
const  cookieParser = require("cookie-parser")


// require routes
const userRoute = require("./routes/auth.route.js");

const app = express();



app.use(express.json());
app.use(cookieParser());







// user routes
app.use("/api/auth", userRoute);












module.exports = app;