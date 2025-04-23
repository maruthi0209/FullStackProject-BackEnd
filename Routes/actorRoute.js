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

// Get actors based on a criteria
actorRoute.get("/actorName", actorController.displayActorBasedOnCriteria)

// Create new actor
actorRoute.post("/create", actorController.createNewActor)

// Update existing actor
actorRoute.put("/:id/update", actorController.updateExistingActor)

// Delete existing actor
actorRoute.delete("/:id/delete", actorController.deleteExistingActor)

module.exports = actorRoute