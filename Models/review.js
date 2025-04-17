const mongoose = require("mongoose")
const reviewSchema = mongoose.Schema(
    {
        movieId : {type : UUID, required : [true, "Require movie ID in the form of UUID"]},
        userId : {type : UUID, required : [true, "Require user ID in the form of UUID"]},
        reviewId : {type : UUID, required : [true, "Require review ID in the form of UUID"]}, 
        reviewTitle : {type : String, required : [true, "Require review title"]},
        reviewDescription : {type : String, required : [true, "Require review description"], max : [1000, "description limit is 1000 characters"]},
        reviewRating : {type : Number, required : [true, "Require review rating"], min : [0, "Minimum rating is 0"], max : [10, "Maximum rating is 10"]}
    },
    {
        timestamps : true
    } 
)

const reviewModel = mongoose.model("reviewModel", reviewSchema)
module.exports = reviewModel; 