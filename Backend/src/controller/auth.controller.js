const userModels = require("../models/user.models");
const BlackListingModels = require("../models/blacklist.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req,res) {
  const {username, password, email} = req.body;

  const isAlreadyRegistered  = await userModels.findOne({
    $or: [
      {username},
      {email}
    ]
  })

  if(isAlreadyRegistered) {
    return res.status(400).json({
       message: "User with the same email or username already exists",
    })
  }
  const hash = await bcrypt.hash(password, 10);

  const user = await userModels.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign({
    id: user._id,
    username: user.username,
  }, process.env.JWT_SECRETS, { expiresIn: "3d" })

  res.cookie("token", token);
  
  res.status(200).json({
    message: "User register SucessFully",
    user: {
      username: user.username,
      email: user.email,
    }
  })
  
}


async function loginUser(req,res) {
  const {username, email,password} = req.body;

  const user = await userModels.findOne({
    $or: [
      {username},
      {email}
    ]
  }).select("+password")

  if(!user) {
    return res.status(400).json({
      message: "Invalid credentials"
    })
  }

  const passwordVerify = await bcrypt.compare(password, user.password);
  if(!passwordVerify){
    return res.status(400).json({
      message: "Invalid credentials",
    })
  }

  const token = jwt.sign({
    id: user._id,
    username: user.username,
  }, process.env.JWT_SECRETS, {expiresIn: "3d"});

  res.cookie("token", token);
  res.status(200).json({
    message: "User Login Successfully ",
    user: {
      username: user.username,
      email: user.email,
    }
  })
  
}
async function getMe(req,res) {
  const user = await userModels.findById(req.user.id);

  res.status(200).json({
    message: "User fetched successfully",
    user,
  })
  
}
async function logOutUser(req,res) {
   const token = req.cookies.token
  res.clearCookie("token");
  await BlackListingModels.create({
    token,
  })

  res.status(200).json({
    message: "User LogOut Successfully",
  })
  
}












module.exports = {
  registerUser,
  loginUser,
  getMe,
  logOutUser,
}