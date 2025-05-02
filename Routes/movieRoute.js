const express = require("express")
const movieRoute = express.Router()

// Importing required movie controller
const movieController = require("../Controllers/movieController")

// Importing required movie model
const Movie = require("../Models/movie")

// Movie routes

// Get all movies
movieRoute.get("/allMovies", movieController.displayAllMoviesList)

// Get one movie details
movieRoute.get("/id/:id", movieController.displayMovieDetails)

// Get movies based on a criteria
movieRoute.get("/category", movieController.displayMoviesBasedOnCriteria)

// Get highest grossing movies
movieRoute.get("/highestgrossing", movieController.displayHighestGrossing)

// Create new movie
movieRoute.post("/create", movieController.createNewMovie)

// Update existing movie
movieRoute.put("/update/:id", movieController.updateExistingMovie)

// Delete existing movie
movieRoute.delete("/delete/:id", movieController.deleteExistingMovie)

// Calculate average rating
movieRoute.get("/average/:id", movieController.calculateAverageRating)

// Get top rated movies
movieRoute.get("/toprated", movieController.displayTopRated)

// Get upcoming release
movieRoute.get("/upcoming", movieController.displayUpcomingReleases)

module.exports = movieRoute