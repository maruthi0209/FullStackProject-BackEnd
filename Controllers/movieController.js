const Movie = require("../Models/movie")
const asyncHandler = require("express-async-handler")

// Display all movies list
exports.displayAllMoviesList = asyncHandler(async(req, res, next) => {
    res.json("Here is a list of all the movies")
})

// Display one movie
exports.displayMovieDetails = asyncHandler(async(req, res, next) => {
    res.json("Here is the details about the particular movie")
})

// Display movies based on a criteria like genre, actor, country, etc.
exports.displayMoviesBasedOnCriteria = asyncHandler(async(req, res, next) => {
    res.json("Here is the list of movies based on given criteria")
})

// Create a new movie
exports.createNewMovie = asyncHandler(async(req, res, next) => {
    res.json("Here is the response when new movie is created")
})

// Update an existing movie
exports.updateExistingMovie = asyncHandler(async(req, res, next) => {
    res.json("Here is the response when existing movie is updated")
})

// Delete existing movie Details
exports.deleteExistingMovie = asyncHandler(async(req, res, next) => {
    res.json("Here is the response when existing movie is deleted")
})