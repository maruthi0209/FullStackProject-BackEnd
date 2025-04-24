const express = require("express")
const actorRoute = express.Router()

// Importing required actor controller
const actorController = require("../Controllers/actorController")

// Importing required actor model
const Actor = require("../Models/actor")

// Actor routes

// Get all actors
actorRoute.get("/allActors", actorController.displayAllActorsList)

// Get one actor details
actorRoute.get("/id/:id", actorController.displayActorDetails)

// Get actors based on name
actorRoute.get("/actorName", actorController.displayActorBasedOnCriteria)

// Create new actor
actorRoute.post("/create", actorController.createNewActor)

// Update existing actor
actorRoute.put("/update/:id", actorController.updateExistingActor)

// Delete existing actor
actorRoute.delete("/delete/:id", actorController.deleteExistingActor)

module.exports = actorRoute