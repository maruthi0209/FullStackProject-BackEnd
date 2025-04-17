const mongoose = require("mongose")
const userSchema = mongoose.Schema(
    {
        userID : {type : UUID, required : [true, "Require user id"]},
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

const UserModel = mongoose.Model("UserModel", userSchema)
modules.export = UserModel