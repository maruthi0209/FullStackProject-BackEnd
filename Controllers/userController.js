const User = require("../Models/user")
const {admin, auth} = require("../firebase")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const OTP_STORE = new Map();
require('dotenv').config();

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
        const token = jwt.sign({ id: savedUser._id, email: savedUser.userEmail }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        console.log(token)
        res.status(200).json({userToken : token, user : {}})
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

// Get user id from email
exports.getUserIdFromEmail = async(req, res) => {
    try {
        const userDetails = await User.find()
        const singleUser = userDetails.filter((user) => user.userEmail == req.params.email)
        res.status(200).json(singleUser[0]._id)
    } catch (error) {
        res.status(502).json("Unable to get id from email " + error.message)
    }
}

exports.sendOtp = async (req, res) => {
    try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    OTP_STORE.set(email, otp.toString()); // Store it temporarily

    // Send email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
        from: `"Screen Score Support" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Screen Score - OTP for Password Reset',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Hi there,</h2>
            <p>We received a request to reset your Screen Score password.</p>
            <p>Your One-Time Password (OTP) is:</p>
            <h3 style="color: #2d89ef;">${otp}</h3>
            <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
            <br />
            <p>If you didn’t request a password reset, please ignore this email.</p>
            <p>– The Screen Score Team</p>
            </div>`,
};
    
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email', error });
    }
};

exports.verifyOtp = (req, res) => {
    try {
        const { email, otp } = req.body;

        const storedOtp = OTP_STORE.get(email);
        if (storedOtp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        OTP_STORE.delete(email); // Optional: clear OTP

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '10m' }); // short-lived token
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Failed to verify otp', error });
    }
};

exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const hashed = await bcrypt.hash(newPassword, 10);

        await User.findOneAndUpdate({ email: decoded.email }, { password: hashed });
        res.json({ message: 'Password reset successfully' });
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// Get User password as per email
// exports.getPasswordFromEmail = async(req, res) => {
//     try {
//         const cryptUserPassword = await User.find({userEmail : `${req.body.userEmail}`}).select('userPassword').exec();

//     } catch (error) {
//         res.status(502).json("Unable to retrieve password from email " + error.message)
//     }
// }
