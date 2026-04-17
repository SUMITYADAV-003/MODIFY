const express = require("express");
const cookieParser = require('cookie-parser');

// require routes
const Router = require("../src/routes/auth.routes");


const app = express();

app.use(express.json());
app.use(cookieParser());


// use routes

app.use("/api/auth", Router)













module.exports = app;