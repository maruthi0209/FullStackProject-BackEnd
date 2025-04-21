const express = require("express")
const reviewRoute = express.Router()

// Importing review controller
const reviewController = require("../Controllers/reviewController")

// Importing required review model
const Review = require("../Models/review")

// Review routes

// Get all reviews for a movie
reviewRoute.get("/:movieId/movieReviews", reviewController.displayAllReviewList)

// Get review based on id
reviewRoute.get("/:reviewId", reviewController.displayReviewDetailsBasedOnId)

// Get all reviews for a user
reviewRoute.get("/:userId/userReviews", reviewController.displayUserReviewList)

// Create new review
reviewRoute.post("/create", reviewController.createNewReview)

// Update existing review
reviewRoute.put("/:id/update", reviewController.updateExistingReview)

// Delete existing review
reviewRoute.delete("/:id/delete", reviewController.deleteExistingReview)

module.exports = reviewRoute