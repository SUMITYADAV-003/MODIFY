const userModel = require("../models/user.models.js")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


async function registerUser(req,res) {
  const {username, email, password} = req.body;

const isAlreadyRegistered = await userModel.findOne({
    $or: [
        { email },
        { username }
    ]
});

  if(isAlreadyRegistered){
    return res.status(400).json({
      message: "User with the same username or email already exits",
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email,
    username, 
    password: hashedPassword,
  })

  const token = jwt.sign({
    id: user._id,
    username: user.username,

  },process.env.JWT_SECRETS, {expiresIn: "3d"})

  res.cookie("token", token);

  res.status(200).json({
    message: "User register Successfully :-",
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
  
}



async function loginUser(req,res) {
  const {username, email, password} = req.body;

  const user = await userModel.findOne({
    $or: [
      {username},
      {email}

    ]
  })

  if(!user){
    return res.status(400).json({
      message: "Invalid  Credentials",
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid  Credentials "
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
      user: user._id,
      username: user.username,
      email: user.email,
    }
  })

   
}



module.exports = {
    registerUser,
    loginUser,
}