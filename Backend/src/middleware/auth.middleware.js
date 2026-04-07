const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models.js");


// async function authUser(req, res,next) {

//    const token = req.cookies.token;


//   if (!token) {
//     return res.status(401).json({
//       message: "Token not  provied",
//     })
//   }

//   try {
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRETS,

//     )
//     req.user = decoded
//     next();
//   }

//   catch (err) {
//     return res.status(401).json({
//       message: "Invalid token ",
//     })
//   }

// }


async function authUser(req,res,next){
  const token = req.cookies.token;
  
  if(!token){
    return res.status(404).json({
      message: "Token not provided",
    })
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRETS,)

    req.user = decoded;
    next();
  }
  catch(err) {
    return res.status(401).json({
      message: "Invild token ",
    })
  }




}

module.exports = {authUser};