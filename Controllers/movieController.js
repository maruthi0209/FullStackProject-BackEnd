const Movie = require("../Models/movie")

// Display all movies list
exports.displayAllMoviesList = async(req, res) => {
    try {
        const allMovies = await Movie.find();
        allMovies.forEach(async element => {
            element.movieCollectionInMillions = Math.floor(Math.random() * 300)
            await Movie.replaceOne({_id : element._id}, element)
            console.log(element)
        });
        
        res.status(200).json(allMovies);
    } catch (error) {
        res.status(502).json("Unable to get all the movies list. " + error.message)
    }
}

// Display one movie
exports.displayMovieDetails = async(req, res) => {
    try {
        const movieDetail = await Movie.findById(req.url.split("/").pop()).exec()
        res.status(200).json(movieDetail)
    } catch (error) {
        res.status(502).json("Unable to get movie details based on id " + req.url)
    }
}

// Display movies based on a criteria like genre, actor, country, etc.
exports.displayMoviesBasedOnCriteria = async(req, res) => {
    try {
        const movieList = await Movie.find(req.query)
        res.status(200).json(movieList)
    } catch (error) {
        res.status(502).json("Unable to get movie details based on given params " + error.message)
    }
}

// Display top 10 highest grossing movies
exports.displayHighestGrossing = async(req, res) => {
    try {
        const highestGrossing = await Movie.find({movieCollectionInMillions : {$gte: 100} }, 'moviePoster movieName movieDirector movieCollectionInMillions movieReleaseYear').exec()
        res.status(200).json(highestGrossing)
    } catch (error) {
        res.status(502).json("Unable to get highest grossing movies " + error.message)
    }
}

// Create a new movie
exports.createNewMovie = async(req, res) => {
    try {
        const savedMovie = await Movie.create(req.body)
        res.status(200).json("Movie details saved successfully " )
    } catch (error) {
        res.status(502).json("Unable to save movie details " + error.message)
    }
}

// Update an existing movie details
exports.updateExistingMovie = async(req, res) => {
    try {
        let updatedMovieDetails = await Movie.replaceOne({_id : req.params.id}, req.body)
        res.status(200).json(`${updatedMovieDetails.matchedCount} entries matched count. ${updatedMovieDetails.modifiedCount} updated successfully. Acknowledged : ${updatedMovieDetails.acknowledged}.`)
    } catch (error) {
        res.status(502).json("Unable to update movie details " + error.message)
    }
}

// Delete existing movie Details
exports.deleteExistingMovie = async(req, res) => {
    try {
        await Movie.deleteOne({_id : req.params.id})
        res.status(200).json(`Movie with id: ${req.params.id} deleted successfully.`)
    } catch (error) {
        res.status(502).json("Unable to delete movie details " + error.message)
    }
}