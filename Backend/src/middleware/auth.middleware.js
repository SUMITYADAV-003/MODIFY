const jwt = require("jsonwebtoken");
const BlackListingModels = require("../models/blacklist.models.js");

async function authUser(req,res,next) {
  const token = req.cookies.token;
  

  if(!token){
    return res.status(401).json({
      message: "Token Not provided",
    })
  }

  try{
    const decoded = jwt.verify(token ,process.env.JWT_SECRETS)

    req.user = decoded;
    next();
  } catch(err){
    return res.status(401).json({
      message: "Invalide token",
    })
  }
  
}


module.exports = {authUser}

