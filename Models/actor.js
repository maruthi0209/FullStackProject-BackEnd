const mongoose = require("mongoose")
const actorSchema = mongoose.Schema(
    {
        actorName : {type : String, required : [true, "Require actor name"]},
        actorDOB : {type : String, required : [true, "Require actor DOB"]},
        actorPhoto : {type : String, required : [true, "Require actor photo"]}
    }, 
    {
        timestamps : true
    }
)

const ActorModel = mongoose.model("ActorModel", actorSchema)
module.exports = ActorModel