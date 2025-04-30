const express = require("express")
const hotTrendingRouter = express.Router()

// Importing required Hot Trending Topics controller
const hotTrendingController = require("../Controllers/hotTrendingController")

// Importing required Hot Trending Topics model
const HotTrending = require("../Models/hotTrending")

// Hot Trending Topics Routes

// Get all hot trending topics
hotTrendingRouter.get("/allHotTrending", hotTrendingController.getAllHotTrending)

// Get existing  hot trending topic details
hotTrendingRouter.get("/id/:id", hotTrendingController.getOneHotTrending)

// Create new hot trending topic details
hotTrendingRouter.post("/create", hotTrendingController.createHotTrending)

// Update existing hot trending topic details
hotTrendingRouter.put("/update/:id", hotTrendingController.updateHotTrending)

// delete existing hot trending topic details
hotTrendingRouter.delete("delete/:id", hotTrendingController.deleteHotTrending)

module.exports = hotTrendingRouter