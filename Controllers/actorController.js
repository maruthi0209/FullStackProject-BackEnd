const Actor = require("../Models/actor")

// Display all actors
exports.displayAllActorsList = async(req, res) => {
    try {
        const allActors = await Actor.find()
        res.status(200).json(allActors)
    } catch (error) {
        res.status(502).json("Unable to retrieve all actors list. " + error.message)
    }
}

// Display one actor
exports.displayActorDetails = async(req, res) => {
    try {
        const actorDetail = await Actor.findById(req.url.split("/")[2])
        res.status(200).json(actorDetail)
    } catch (error) {
        res.status(502).json("Unable to get actor details based on id " + error.message)
    }
}

// Display actors based on name
exports.displayActorBasedOnCriteria = async(req, res) => {
    try {
        const actorsBasedOnName = await Actor.find({name : req.url.split("/")[2]})
    } catch (error) {
        res.status(502).json("Unable to get actor details based on given criteria " + error.message)
    }
}

// Create a new actor
exports.createNewActor = async(req, res) => {
    try {
        const savedActor = await Actor.create(req.body)
        res.status(200).json("Actor details saved successfully " + savedActor)
    } catch (error) {
        res.status(502).json("Unable to save actor details " + error.message)
    }
}

// Update an existing actor details
exports.updateExistingActor = async(req, res) => {
    try {
        const updatedActorDetails = await Actor.replaceOne({_id : req.params.id}, req.body)
        res.status(200).json(`${updatedActorDetails.matchedCount} entries matched count. ${updatedActorDetails.modifiedCount} updated successfully. Acknowledged : ${updatedActorDetails.acknowledged}.`)
    } catch (error) {
        res.status(502).json("Unable to update actor details " + error.message)
    }
}

// Delete existing actor details
exports.deleteExistingActor = async(req, res) => {
    try {
        await Actor.deleteOne({_id : req.params.id})
    } catch (error) {
        res.status(502).json("Unable to delete actor details " + error.message)
    }
}