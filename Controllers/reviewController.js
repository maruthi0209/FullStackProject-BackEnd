const Review = require("../Models/review")
const Movie = require("../Models/movie")

// Get all reviews for a movie
exports.displayAllReviewList = async(req, res) => {
    try {
        const allReviews = await Review.find({movieId: req.url.split("/").pop()})
        res.status(200).json(allReviews)
    } catch (error) {
        res.status(502).json("Unable to get all movie reviews list. " + error.message)
    }
}

// Get a review based on id
exports.displayReviewDetails = async(req, res) => {
    try {
        const reviewDetail = await Review.findById(req.url.split("/")[2]).exec()
        res.status(200).json(reviewDetail)
    } catch (error) {
        res.status(502).json("Unable to get review details based on id " + error.message)
    }
}

// Get all reviews for a user
exports.displayUserReviewList = async(req, res) => {
    try {
        const userReviews = await Review.find({userId: req.url.split("/")[2]})
        res.status(200).json(userReviews)
    } catch (error) {
        res.status(502).json("Unable to get reviews for single user " + error.message)
    }
}

// Create new review
exports.createNewReview = async(req, res) => {
    try {
        const savedReview = await Review.create(req.body)
        res.status(200).json("Review details saved successfully" + savedReview)
    } catch (error) {
        res.status(502).json("Unable to save review details " + error.message)
    }
}

// Update existing review
exports.updateExistingReview = async(req, res) => {
    try {
        const updatedReviewDetails = await Review.replaceOne({_id: req.params.id}, req.body)
        res.status(200).json(`${updatedReviewDetails.matchedCount} entries matched count. ${updatedReviewDetails.modifiedCount} updated successfully. Acknowledged : ${updatedReviewDetails.acknowledged}.`)
    } catch (error) {
        res.status(502).json("Unable to update review details " + error.message)
    }
}

// Delete existing review
exports.deleteExistingReview = async(req, res) => {
    try {
        await Review.deleteOne({_id: req.url.split("/")[2]})
        res.status(200).json(`Review with id: ${req.params.id} deleted successfully.`)
    } catch (error) {
        res.status(502).json("Unable to delete review details " + error.message)
    }
}