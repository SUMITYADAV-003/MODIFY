const jwt = require("jsonwebtoken");




async function authUser(req,res,next) {
  const  token = req.cookies.token;

  if(!token) {
    return res.status(404).json({
      message: "Token not provided",
    })
  }



  try{
    const decode = jwt.verify(
      token,
      process.env.JWT_SECETS,
    )
    req.user = decode;
    next();
  }
  catch(err) {
    return res.status(401).json({
      message: "Invalid token"
    })
  }
  
}


module.exports = {authUser}