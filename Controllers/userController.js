const User = require("../Models/user")
const {admin, auth} = require("../firebase")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")


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
        const userData = await User.findById(req.url.split("/").pop()).exec()
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
        const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);
        req.body.userPassword = hashedPassword;
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

// Firebase user
exports.firebaseUserLogin = async(req, res) => {
    
    const idToken = req.headers.authorization?.split("Bearer ")[1];
    if (!idToken) {
        return res.status(401).json({ error: "Token missing" });
    }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;
    // OPTIONAL: create session cookie or custom JWT here

    // Success
    return res.status(200).json({ uid, message: "User verified" });
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
}

// Check user login 
exports.checkUserLogin = async(req, res) =>{
    try {
        const userByEmail = await User.find({userEmail : `${req.body.userEmail}`})
        if (userByEmail.length == 0) {
            res.status(400).json("User does not exist.")
        } else {
            const isMatch = await bcrypt.compare(req.body.userPassword, userByEmail[0].userPassword);
            if ( isMatch) {
                const token = jwt.sign({userEmail : userByEmail[0].userEmail, userPassword : userByEmail[0].userPassword}, process.env.JWT_SECRET, { expiresIn: "1h" });
                res.status(200).json({token, user: {userEmail : userByEmail[0].userEmail, userPassword : userByEmail[0].userPassword}});
            }
            else {
                res.status(400).json("Invalid user credentials ")
            }
        }
    } catch (error) {
        res.status(502).json("Error occured during login process " + error.message)
    }
}

// Get User password as per email
// exports.getPasswordFromEmail = async(req, res) => {
//     try {
//         const cryptUserPassword = await User.find({userEmail : `${req.body.userEmail}`}).select('userPassword').exec();

//     } catch (error) {
//         res.status(502).json("Unable to retrieve password from email " + error.message)
//     }
// }
