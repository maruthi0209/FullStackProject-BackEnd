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

// Get movies based on a name
movieRoute.get("/name", movieController.displayMoviesBasedOnCriteria)

// Get highest grossing movies
movieRoute.get("/highestgrossing", movieController.displayHighestGrossing)

// Create new movie
movieRoute.post("/create", movieController.createNewMovie)

// Update existing movie
movieRoute.put("/update/:id", movieController.updateExistingMovie)

// Delete existing movie
movieRoute.delete("/delete/:id", movieController.deleteExistingMovie)

// Calculate average rating
movieRoute.put("/average/:id", movieController.calculateAverageRating)

// Get top rated movies
movieRoute.get("/toprated", movieController.displayTopRated)

// Get upcoming release
movieRoute.get("/upcoming", movieController.displayUpcomingReleases)

// Get fan favorite movies
movieRoute.get("/fanfavorites", movieController.displayFanFavorites)

// Calculate number of times favorited
movieRoute.put("/favorited/:id/:favbool", movieController.calculateNumberOfTimesFavorited)

// Get movies based on genre
movieRoute.get("/genre/:name", movieController.displayMovieOnGenre)

module.exports = movieRoute