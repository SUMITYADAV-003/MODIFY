const userModel = require("../models/user.models.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



async function registerUser(req,res) {
  const {username, email, password} = req.body;

  const isAlreadyRegister = await userModel.findOne({
    $or:[
      {username},
      {email},
    ]
  })

  if(isAlreadyRegister){
      return res.status(401).json({
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
  }, process.env.JWT_SECRETS, {expiresIn: "3d"});


  res.cookie("token", token);
  res.status(200).json({
    message: "user register sucessfully :",
    user: {
      username: user.username,
      email: user.email,
    }
  })
 
}


async function loginUser(req,res){

  const {username, email, password} = req.body;

  const user = await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  }).select("+password")

  if(!user){
    return res.status(401).json({
      message: "Invalid credentials",
    })
  }

  const isPasswordValide = await bcrypt.compare(password, user.password);
  
  if(!isPasswordValide) {
    return res.status(401).json({
      message: "Invalid credentials",
    })
  }

  const token = jwt.sign({
    id: user._id,
    username: user.username,
  }, process.env.JWT_SECRETS, {expiresIn: "3d"});

  res.cookie("token", token);

  res.status(200).json({
    message: "user login sucessfully",
    user: {
      username: user.username,
      email: user.email,
    },
  })

}


async function getMe(req,res) {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "user featched Sucessfully ",
    user,
  })
}



async function logOutUser(req,res) {
   const token = req.cookies.token

    res.clearCookie("token");

    res.status(201).json({
      message: "user logout sucessfully",
    })
  
  
}







module.exports = {
  registerUser,
  loginUser,
  getMe,
  logOutUser
}