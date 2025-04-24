const express = require("express")
const genreRoute = express.Router()

// Importing required genre controller
const genreController = require("../Controllers/genreController")

// Importing required genre model
const genreModel = require("../Models/genre")

// Genre routes

// Get all genres
genreRoute.get("/allGenres", genreController.displayAllGenresList)

// Get one genre details
genreRoute.get("/id/:id", genreController.displayGenreDetails)

// Get genres based on genre name
genreRoute.get("/genreName", genreController.displayGenreBasedOnName)

// Create new genre
genreRoute.post("/create", genreController.createNewGenre)

// Update existing genre
genreRoute.put("/update/:id", genreController.updateExistingGenre)

// Delete existing genre
genreRoute.delete("/delete/:id", genreController.deleteExistinGenre)

module.exports = genreRoute