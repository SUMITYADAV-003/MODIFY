const jwt  = require("jsonwebtoken");


async function authuser(req,res,next) {
  const token = req.cookies.token;

  if(!token){
    return res.status(401).json({
      message: "Token Not provided ",
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETS);

    req.user = decoded;
    next();
  }
  catch(err){
    console.log(err);
  }
  
}



module.exports = {authuser}