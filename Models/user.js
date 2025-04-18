const mongoose = require("mongoose")
const userSchema = mongoose.Schema(
    {
        userID : {type : String, required : [true, "Require user id"]},
        userName : {type : String, required : [true, "Require user name"]},
        userEmail : {type : String, required : [true, "Require user email"]},
        userPassword : {type : String, required : [true, "Require user password"]},
        userFavorites : {type : Array},
        userIsAdmin : {type : Boolean, required : [true, "Require user type"], default : false}
    },
    {
        timestamps : true
    } 
)

// const UserModel = mongoose.model("UserModel", userSchema)
// module.export = {UserModel}
module.exports = mongoose.model("UserModel", userSchema);