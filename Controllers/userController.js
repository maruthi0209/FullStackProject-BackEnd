const User = require("../Models/user")
const asyncHandler = require("express-async-handler")

// Display all users list
exports.displayAllUsersList = asyncHandler(async(req, res, next) => {
    res.json("Here is the list of all users")
})

// Display user data
exports.displayUserData = asyncHandler(async(req, res, next) => {
    res.json("Here is the requested user data")
})

// Display admin users
exports.displayAdminUsers = asyncHandler(async(req, res, next) => {
    res.json("Here is the list of admin users")
})

// Create a new user
exports.createNewUser = asyncHandler(async(req, res, next) => {
    res.json("Here is the response when new user is created")
})

// Update an existing user
exports.updateExistingUser = asyncHandler(async(req, res, next) => {
    res.json("Here is the response when existing user is updated")
})

// Delete an existing user
exports.deleteExistingUser = asyncHandler(async(req, res, next) => {
    res.json("Here is the response when existing user is deleted")
})