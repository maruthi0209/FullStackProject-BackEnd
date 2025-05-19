const Review = require("../Models/review")

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
        const userReviews = await Review.find({userId: req.url.split("/").pop()})
        res.status(200).json(userReviews)
    } catch (error) {
        res.status(502).json("Unable to get reviews for single user " + error.message)
    }
}

// Get all review for a movie
exports.displayMovieReviewList = async(req, res) => {
    try {
        const movieReviews = await Review.find({movieId : req.url.split("/").pop()})
        res.status(200).json(movieReviews)
    } catch (error) {
        res.status(502).json("Unable to get reviews for single movie " + error.message)
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

// Get rating bar graph data
exports.getRatingBarGraphData = async(req, res) => {
    try {
        let ratingNumbers = {'Bad' : 0, 'Average' : 0, 'Good' : 0, 'Excellent' : 0}
        graphData = {
            labels : Object.keys(ratingNumbers), 
            datasets : [{
                label : 'Audience rating out of 10',
                data : [],
                backgroundColor : [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ]
            }]
        }
        const movieReviews = await Review.find({movieId : req.url.split("/").pop()})
        movieReviews.forEach((review) => {
            switch(true) {
                case (review.reviewRating >= 0 && review.reviewRating <= 4) :
                    ratingNumbers.Bad += 1
                    break;
                case (review.reviewRating >= 5 && review.reviewRating <= 6) :
                    ratingNumbers.Average += 1
                    break;
                case (review.reviewRating >= 7 && review.reviewRating <= 8) :
                    ratingNumbers.Good += 1
                    break;
                case(review.reviewRating >= 9 && review.reviewRating <= 10) :
                    ratingNumbers.Excellent += 1
                    break;
            }
        })
        graphData.datasets[0].data = Object.values(ratingNumbers)
        res.status(200).json(graphData)
    } catch (error) {
        res.status(502).json("Unable to get bar graph data " + error.message )
    }
}