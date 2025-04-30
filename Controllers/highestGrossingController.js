const HighestGrossing = require("../Models/highestgrossing")
const Movie = require("../Models/movie")

// Get all highest grossing movies
exports.getAllHighestGrossing = async(req, res) => {
    try {
        const allHighestGrossingBasic = await HighestGrossing.find()
        // let allHighestGrossing = allHighestGrossingBasic.map(async(element) => {
        //     const movieDetails = await Movie.findById(element.movieId, 'moviePoster movieName movieDirector')
        //     movieDetails.movieCollectionInMillions = element.movieCollectionInMillions
        //     return movieDetails;
        // })
        console.log(allHighestGrossingBasic)
        res.status(200).json(allHighestGrossingBasic)
    } catch (error) {
        res.status(502).json("Unable to get highest grossing movies list. " + error.message)
    }
}

// Get one highest grossing movie
exports.getOneHighestGrossing = async(req, res) => {
    try {
        const highestGrossing = await HighestGrossing.findById(req.url.split("/").pop()).exec()
        res.status(200).json(highestGrossing)
    } catch (error) {
        res.status(502).json("Unable to get highest grossing movie details based on id " + error.message)
    }
}

// Create highest grossing movie
exports.createHighestGrossing = async(req, res) => {
    try {
        const savedHighestGrossing = await HighestGrossing.create(req.body)
        res.status(200).json("Highest grossing movie details created successfully " + savedHighestGrossing)
    } catch (error) {
        res.status(502).json("Unable to save highest grossing movie details " + error.message)
    }
}

// Update highest grossing movie
exports.updateHighestGrossing = async(req, res) => {
    try {
        const updatedHighestGrossing = await HighestGrossing.replaceOne({_id : req.params.id}, req.body)
        res.status(200).json(`${updatedHighestGrossing.matchedCount} entries matched count. ${updatedHighestGrossing.modifiedCount} updated successfully. Acknowledged : ${updatedHighestGrossing.acknowledged}.`)
    } catch (error) {
        res.status(502).json("Unable to update highest grossing movie details " + error.message)
    }
}

// Delete highest grossing movie
exports.deleteHighestGrossing = async(req, res) => {
    try {
        await HighestGrossing.deleteOne({_id:req.params.id})
        res.status(200).json(`Highest grossing movie with id ${req.params.id} deleted successfully.`)
    } catch (error) {
        res.status(502).json("Unable to delete hhighest grossing movie details " + error.message)
    }
}