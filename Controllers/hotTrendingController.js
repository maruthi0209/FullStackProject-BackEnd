const HotTrending = require("../Models/hotTrending")

// Get all Hot Trending topics
exports.getAllHotTrending = async(req, res) => {
    try {
        const hotTrendingList = await HotTrending.find()
        res.status(200).json(hotTrendingList)
    } catch (error) {
        res.status(502).json("Unable to get all hot trending topics list. " + error.message)
    }
}

// Get one Hot Trending topics
exports.getOneHotTrending = async(req, res) => {
    try {
        const hotTrendingTopic = await HotTrending.findById(req.url.split("/").pop()).exec()
        res.send(200).json(hotTrendingTopic)
    } catch (error) {
        res.status(502).json("Unable to get topics details based on id " + error.message)
    }
}

// Create Hot Trending topic
exports.createHotTrending = async(req, res) => {
    try {
        const savedHotTrending = await HotTrending.create(req.body)
        res.status(200).json("Hot Trending topic details saved successfully")
    } catch (error) {
        res.status(502).json("Unable to save hot trending topic details " + error.message)
    }
}

// Update Hot Trending topic
exports.updateHotTrending = async(req, res) => {
    try {
        const updatedHotTrending = await HotTrending.replaceOne({_id : req.param.id} , req.body)
        res.send(200).json(`${updatedHotTrending.matchedCount} entries matched count. ${updatedHotTrending.modifiedCount} updated successfully. Acknowledged : ${updatedHotTrending.acknowledged}.`)
    } catch (error) {
        res.send(502).json("Unable to update hot trending topic details " + error.message)
    }
}

// Delete Hot Trending topic
exports.deleteHotTrending = async(req, res) => {
    try {
        await HotTrending.deleteOne({_id : req.param.id})
        res.status(200).json(`Hot Trending topic with id ${req.param.id} deleted successfully.`)
    } catch (error) {
        res.send(502).json("Unable to delete hot trending topic details " + error.message)
    }
}