const mongoose = require("mongoose")
const MovieModel = require("./movie")
const reviewSchema = mongoose.Schema(
    {
        movieId : {movie : mongoose.ObjectId, required : [true, "Require movie ID"]},
        userId : {user : mongoose.ObjectId, required : [true, "Require user ID"]},
        reviewTitle : {type : String, required : [true, "Require review title"]},
        reviewDescription : {type : String, required : [true, "Require review description"], max : [1000, "description limit is 1000 characters"]},
        reviewRating : {type : Number, required : [true, "Require review rating"], min : [0, "Minimum rating is 0"], max : [10, "Maximum rating is 10"]},
        reviewLikes : {type : Number, required : true, min : 0}
    },
    {
        timestamps : true
    } 
)

module.exports = mongoose.model("reviewModel", reviewSchema)