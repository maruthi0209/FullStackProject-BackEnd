const Review = require("../Models/review")
const asyncHandler = require("express-async-handler")

// Get all reviews for a movie
exports.displayAllReviewList = asyncHandler(async(req, res, next) => {
    res.json("Here is the list of all review for a particular movie")
})

// Get a review based on id
exports.displayReviewDetailsBasedOnId = asyncHandler(async(req, res, next) => {
    res.json("Here is the review based on the requested Id")
})

// Get all review for a user
exports.displayUserReviewList = asyncHandler(async(req, res, next) => {
    res.json("Here is the review list for the particular user")
})

// Create new review
exports.createNewReview = asyncHandler(async(req, res, next) => {
    res.json("Here is the response when new review is created")
})

// Update existing review
exports.updateExistingReview = asyncHandler(async(req, res, next) => {
    res.json("Here is the response when existing review is updated")
})

// Delete existing review
exports.deleteExistingReview = asyncHandler(async(req, res, next) => {
    res.json("Here is the response when existing user is deleted")
})