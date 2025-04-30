const mongoose = require("mongoose")
const highestGrossingSchema = mongoose.Schema(
    {
        movieId : {type : mongoose.Schema.Types.ObjectId, required : [true, "require movie id"]},
        movieCollectionInMillions : {type : Number, required : [true, "require movie box office collection"]}
    },
    {
        timestamps : true
    }
)

const HighestGrossing = mongoose.model("HighestGrossing", highestGrossingSchema)
module.exports = HighestGrossing