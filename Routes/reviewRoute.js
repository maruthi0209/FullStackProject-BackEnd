const express = require("express")
const reviewRoute = express.Router()

// Importing review controller
const reviewController = require("../Controllers/reviewController")

// Importing required review model
const Review = require("../Models/review")

// Review routes

// Get all reviews for a movie
reviewRoute.get("/movieReviews/:movieId", reviewController.displayAllReviewList)

// Get review based on id
reviewRoute.get("/reviewId/:reviewId", reviewController.displayReviewDetails)

// Get all reviews for a user
reviewRoute.get("/userReviews/:userId", reviewController.displayUserReviewList)

// Create new review
reviewRoute.post("/create", reviewController.createNewReview)

// Update existing review
reviewRoute.put("/update/:id", reviewController.updateExistingReview)

// Delete existing review
reviewRoute.delete("/delete/:id", reviewController.deleteExistingReview)

module.exports = reviewRoute