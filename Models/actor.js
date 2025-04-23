const mongoose = require("mongoose")
const actorSchema = mongoose.Schema(
    {
        actorName : {type : String, required : [true, "Require actor name"]},
        actorDOB : {type : String}, required : [true, "Require actor DOB"]
    }, 
    {
        timestamps : true
    }
)

module.exports = mongoose.model("ActorModel", actorSchema)