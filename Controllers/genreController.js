const Genre = require("../Models/genre")

// Display all genres
exports.displayAllGenresList = async(req, res) => {
    try {
        const allGenres = await Genre.find()
        res.status(200).json(allGenres)
    } catch (error) {
        res.status(502).json("Unable to retrieve all genres list. " + error.message)
    }
}

// Display one genre
exports.displayGenreDetails = async(req, res) => {
    try {
        const genreDetail = await Genre.findById(req.url.split("/")[2])
        res.status(200).json(genreDetail)
    } catch (error) {
        res.status(502).json("Unable to get genre details based on id " + error.message)
    }
}

// Display genre based on name
exports.displayGenreBasedOnName = async(req, res) => {
    try {
        res.json("Response for genre based on name")
    } catch (error) {
        res.status(502).json("Unable to get genre details based on given criteria " + error.message)
    }
}

// Create a new genre
exports.createNewGenre = async(req, res) => {
    try {
        const savedGenre = await Genre.create(req.body)
        res.status(200).json(savedGenre)
    } catch (error) {
        res.status(502).json("Unable to save genre details " + error.message)
    }
}

// Update an existing genre details
exports.updateExistingGenre = async(req, res) => {
    try {
        const updatedGenreDetails = new Genre.replaceOne({_id : req.params.id}, req.body)
        res.status(200).json(`${updatedGenreDetails.matchedCount} entries matched count. ${updatedGenreDetails.modifiedCount} updated successfully. Acknowledged : ${updatedGenreDetails.acknowledged}.`)
    } catch (error) {
        res.status(502).json("Unable to update genre details " + error.message)
    }
}

// Delete an existing genre details
exports.deleteExistinGenre = async(req, res) => {
    try {
        await Genre.deleteOne({_id : req.params.id})
    } catch (error) {
        res.status(502).json("Unable to delete genre details " + error.message)
    }
}