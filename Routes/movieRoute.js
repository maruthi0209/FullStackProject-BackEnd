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

// Create new movie
movieRoute.post("/create", movieController.createNewMovie)

// Update existing movie
movieRoute.put("/:id/update", movieController.updateExistingMovie)

// Delete existing movie
movieRoute.delete("/:id/delete", movieController.deleteExistingMovie)

module.exports = movieRoute