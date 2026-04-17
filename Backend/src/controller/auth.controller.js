const userModel  = require("../models/user.models.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


async function registerUser(req,res) {
  const {username, email, password} = req.body;

  const isAlreadyRegistered = await userModel.findOne({
    $or: [
      {username},
      {email},
    ],
  });

  if(isAlreadyRegistered){
    return res.status(400).json({
      message: "User with the same email or username already exists",
    })
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });


   const token = jwt.sign({
      id: user._id,
      username: user.username,
   }, process.env.JWT_SECETS, {expiresIn: "3d"});

   res.cookie("token", token);
   res.status(200).json({
    messages: "User register successfullly",
    user: {
      username: user.username,
      emial: user.email,
    }
   })
}

async function loginUser(req,res) {
  const {username, email, password} = req.body;

  const user = await userModel.findOne({
    $or: [
      {username},
      {email},
    ]
  }).select("+password")

  if(!user){
    return res.status(400).json({
      message: "Invalid credentials",
    })
  }

  const isPasswordValde = await bcrypt.compare(password ,user.password);

  if(!isPasswordValde){
    return res.status(400).json({
      message: "Invalid credentials",
    })
  }

  const token = jwt.sign({
    id: user._id,
    username: user.username,
  }, process.env.JWT_SECETS, {expiresIn: "3d"});

  res.cookie("token", token);

  res.status(200).json({
    message: "user login successfully",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    }
  })


}





module.exports = {
  registerUser,
  loginUser,
 
}