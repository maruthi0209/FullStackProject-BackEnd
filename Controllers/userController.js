const User = require("../Models/user")
const asyncHandler = require("express-async-handler")

// Display all users list
exports.displayAllUsersList = async(req, res) => {
    try {
        const usersList = await User.find()
        res.status(200).json(usersList)
    } catch (error) {
        res.status(502).json("Unable to get all users list. " + error.message)
    }
}

// Display user data
exports.displayUserData = async(req, res) => {
    try {
        const userData = await User.findById(req.url.split("/")[2]).exec()
        res.status(200).json(userData)
    } catch (error) {
        res.status(502).json("Unable to get user details based on id " + error.message)
    }
}

// Display admin users
exports.displayAdminUsers = async(req, res) => {
    try {
        const adminUsers = await User.find({userIsAdmin : true})
        res.status(200).json(adminUsers)
    }
     catch (error) {
        res.status(502).json("Unable to get admin users " + error.message)
    }
}

// Create a new user
exports.createNewUser = async(req, res) => {
    try {
        const savedUser = await User.create(req.body)
        res.status(200).json("User details saved successfully" + savedUser)
    } catch (error) {
        res.status(502).json("Unable to save user details " + error.message)
    }
}

// Update an existing user
exports.updateExistingUser = async(req, res) => {
    try {
        const updatedUserDetails = await User.replaceOne({_id: req.params.id}, req.body)
        res.status(200).json(`${updatedUserDetails.matchedCount} entries matched count. ${updatedUserDetails.modifiedCount} updated successfully. Acknowledged : ${updatedUserDetails.acknowledged}.`)
    } catch (error) {
        res.status(502).json("Unable to update user details " + error.message)
    }
}

// Delete an existing user
exports.deleteExistingUser = async(req, res) => {
    try {
        await User.deleteOne({_id: req.params.id})
        res.status(200).json(`User with id ${req.params.id} deleted successfully `)
    } catch (error) {
        res.status(502).json("Unable to delete user details " + error.message)
    }
}