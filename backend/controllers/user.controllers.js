import { response } from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

//Register
export const register = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 6 characters",
      });
    }
    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log("ERROR:", error.message);
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed to register",
    });
  }
};

//login
export const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "All fields are reqired"
        })
    }
    let user = await User.findOne({email})
    if(!user){
        return res.status(400).json({
            success: false,
            message: "Incorrect email and password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        return res.status(400).json({
            success: false,
            message:"Invalid Credentials"
        })
    }

    //Tokens for cookies
    const token = await jwt.sign({userId:user._id}, process.env.SECRET_KEY, {expiresIn: "1d"});
    return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpsOnly: true, samesite: "strict"}).json({
        success:true,
        message: `Welcome back ${user.firstName}`,
        user
    });
  } catch (error) {
    console.log("ERROR:", error.message);
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed to register",
    });
  }
};

//logout
export const logout = async (req, res) => {
    try{
        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            message:"Logout successfully!",
            success: true
        })
    } catch (error){
        console.log("ERROR:", error.message);
        console.log(error);
    }
}

//updateProfile
export const updateProfile = async(req, res) => {
  try {
    const userId = req.id
    const {firstName, lastName, occupation, bio, instagram, linkedin, github} = req.body;
    const file = req.file;

    const fileUri = getDataUri(file)
    let cloudResponse = await cloudinary.uploader.upload(fileUri)
    
    const user = await User.findById(userId).select("-password")
    if(!user){
      return res.status(404).json({
        message:"User not found",
        success: false
      })
    }

    //Updating data
    if(firstName) user.firstName = firstName
    if(lastName) user.lastName = lastName
    if(occupation) user.occupation = occupation
    if(instagram) user.instagram = instagram
    if(linkedin) user.linkedin = linkedin
    if(github) user.github = github
    if(bio) user.bio = bio
    if(file) user.photoUrl = cloudResponse.secure_url

    await user.save()
    return res.status(200).json({
      message:"Profile updated successfully",
      success:true,
      user
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"fail to updated profile"
    })
  }
}

//getAllUsers
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password")  //exclude password field
    console.log("Users :", users)
    res.status(200).json({
      success:true,
      messsage:"User list fetched successfully",
      total:users.length,
      users
    })
  } catch (error) {
    console.log("Error fatching user List:", error)
    res.status(500).json({
      success:false,
      message:"Failed to fetch users"
    })
  }
}