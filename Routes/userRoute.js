const express = require("express")
const userRoute = express.Router()

// Importing required user controller
const userController = require("../Controllers/userController")

// Importing required user model
const User = require("../Models/user")

// User routes

// Get all users 
userRoute.get("/allUsers", userController.displayAllUsersList)

// Get particular user
userRoute.get("/id/:id", userController.displayUserData)

// Get admin users
userRoute.get("/adminUsers", userController.displayAdminUsers)

// Create new user
userRoute.post("/create", userController.createNewUser)

// Update existing user
userRoute.put("/update/:id", userController.updateExistingUser)

// Delete existing user
userRoute.delete("/delete/:id", userController.deleteExistingUser)

// Firebase user
userRoute.post("/login", userController.firebaseUserLogin)

// Email user
userRoute.post("/emailLogin", userController.checkUserLogin)

// Get user id from email
userRoute.get("/getidfromemail/:email", userController.getUserIdFromEmail)

// Send OTP to user in case of forgot password
userRoute.post("/auth/send-otp", userController.sendOtp)

// Verify OTP
userRoute.post("/auth/verify-otp", userController.verifyOtp)

// Authenticate OTP
userRoute.post("/auth/reset-password", userController.resetPassword)

module.exports = userRoute