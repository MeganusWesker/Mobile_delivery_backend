import catchAsyncErrors from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { sendToken } from "../utils/sendToken.js";
import { User } from "../models/userModel.js";


export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("please enter all fields ", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(res, user, 200, "register Successfully");
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!password || !email)
    return next(new ErrorHandler("please enter all fields", 403));

  if (!user) {
    return next(new ErrorHandler("user not found please register", 404));
  }

  const isMatched = await user.comparePassword(password);

  if (!isMatched) {
    return next(new ErrorHandler("invalid credentials", 403));
  }

  sendToken(res, user, 200, "loged in successfullly");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  
    res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: process.env.NODE_ENV === "Development" ? false : true,
    secure: process.env.NODE_ENV === "Development" ? false : true,
    sameSite: process.env.NODE_ENV === "Development" ? false : "none",
  });


  res.status(200).json({
    success: true,
    message: "loged out sucessfully",
  });
});


export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
      success: true,
      users,
  });
});


export const getMyProfile = catchAsyncErrors(async (req, res, next) => {
  const user = (await User.findById(req.user._id));
  res.status(200).json({
      success: true,
      user,
  });
});

export const updateUser = catchAsyncErrors(async (req, res, next) => {
  const user = (await User.findById(req.params.id));
  if (!user) {
      return next(new ErrorHandler("user not found", 404));
  }
 
  if (user.role === "user") {
      user.role = "admin";
  }
  else {
      user.role = "user";
  }

  await user.save();
  res.status(200).json({
      success: true,
      message: "user updated successfully",
  });
});