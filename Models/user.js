const mongoose = require("mongoose")
const userSchema = mongoose.Schema(
    {
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

module.exports = mongoose.model("UserModel", userSchema);