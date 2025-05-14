const mongoose = require("mongoose")
const reviewSchema = mongoose.Schema(
    {
        movieId : {type : mongoose.Schema.Types.ObjectId, ref : 'MovieModel', required : [true, "Require movie ID"]},
        userId : {type : mongoose.Schema.Types.ObjectId, ref : 'UserModel', required : [true, "Require user ID"]},
        reviewTitle : {type : String, required : [true, "Require review title"]},
        reviewDescription : {type : String, required : [true, "Require review description"], max : [1000, "description limit is 1000 characters"]},
        reviewRating : {type : Number, required : [true, "Require review rating"], min : [0, "Minimum rating is 0"], max : [10, "Maximum rating is 10"]},
        reviewLikes : {type : Number, required : true, min : 0},
        reviewLocation : {type : String, required : [true, "Require review location"]}
    },
    {
        timestamps : true
    } 
)

const ReviewModel = mongoose.model("ReviewModel", reviewSchema)
module.exports = ReviewModel