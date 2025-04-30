const express = require("express")
const HighestGrossingRouter = express.Router()

// Importing required highest grossing controller
const highestGrossingController = require("../Controllers/highestGrossingController")

// Importing required highest grossing model
const highestGrossingModel = require("../Models/highestgrossing")

// Highest Grossing Routes

// Get all highest grossing movies
HighestGrossingRouter.get("/allHighestGrossing", highestGrossingController.getAllHighestGrossing)

// Get one highest grossing movie
HighestGrossingRouter.get("/id/:id", highestGrossingController.getOneHighestGrossing)

// Create new highest grossing movie
HighestGrossingRouter.post("/create", highestGrossingController.createHighestGrossing)

// Update existing highest grossing movie
HighestGrossingRouter.put("/update/:id", highestGrossingController.updateHighestGrossing)

// Delete existing highest grossing movie
HighestGrossingRouter.delete("/delete/:id", highestGrossingController.deleteHighestGrossing)

module.exports = HighestGrossingRouter