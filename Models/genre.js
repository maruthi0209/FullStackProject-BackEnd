const mongoose = require("mongoose")
const genreSchema = mongoose.Schema(
    {
        genreName : {type : String, required : [true, "Require genre name"]},
        genreDescription : {type : String, required : [true, "Require genre description"], max : [1000, "Description limit is 1000 characters"]}
    },
    {
        timestamps : true
    }
)

const Genre = mongoose.model("GenreModel", genreSchema)
module.exports = Genre