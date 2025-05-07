const Movie = require("../Models/movie")
const Review = require("../Models/review")

// Display all movies list
exports.displayAllMoviesList = async(req, res) => {
    try {
        const allMovies = await Movie.find();
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

// Get top rated movies
exports.displayTopRated = async(req, res) => {
    try {
        const topRatedMovies = await Movie.find({movieAverageRating : {$gte : 5}}, 'moviePoster movieDirector movieName movieAverageRating movieReleaseYear').limit(5).sort({rev : -1}).exec()
        res.status(200).json(topRatedMovies)
    } catch (error) {
        res.status(502).json("Unable to get top rated movies list " + error.message)
    }
}

// Get upcoming releases
exports.displayUpcomingReleases = async(req, res) => {
    try {
        const upcomingReleases = await Movie.find({movieReleaseYear : {$gte : 2025}, }, 'moviePoster movieName movieDirector movieStudio movieReleaseYear').limit(5).sort({movieRelease : -1}).exec()
        res.status(200).json(upcomingReleases)
    } catch (error) {
        res.status(502).json("Unable to get upcoming movies list " + error.message)
    }
}

// Display top highest grossing movies
exports.displayHighestGrossing = async(req, res) => {
    try {
        const highestGrossing = await Movie.find({movieCollectionInMillions : {$gte: 100} }, 'moviePoster movieName movieDirector movieCollectionInMillions movieReleaseYear').limit(5).sort({movieCollectionInMillions : -1}).exec()
        res.status(200).json(highestGrossing)
    } catch (error) {
        res.status(502).json("Unable to get highest grossing movies " + error.message)
    }
}

// Calculate average rating
exports.calculateAverageRating = async(req, res) => {  
    try {
        const movieDetails = await Movie.findById(req.params.id).exec()
        const movieReviews = await Review.find({movieId : req.url.split("/").pop()})
        let averageRating = 0
        movieReviews.forEach(element => {
            averageRating = averageRating + element.reviewRating
        })
        averageRating /= movieReviews.length
        movieDetails.movieAverageRating = Math.floor(averageRating)
        const updatedMovie = await Movie.replaceOne({_id : req.params.id}, movieDetails)
        res.status(200).json(`${updatedMovie.matchedCount} entries matched count. ${updatedMovie.modifiedCount} updated successfully. Acknowledged : ${updatedMovie.acknowledged}.`)
    } catch (error) {
        res.status(502).json("There was some error calculating movie average rating " + error.message)
    }
}

// Calculate number of times movie is favorited
exports.calculateNumberOfTimesFavorited = async(req, res) => {
    try {
        const movieDetails = await Movie.findById(req.params.id).exec();
        (req.params.favbool == true) ? movieDetails.favorited += 1 : movieDetails.favorited -= 1
        const updatedMovie = await Movie.replaceOne({_id : movieDetails._id}, movieDetails)
        res.status(200).json(updatedMovie)
    } catch (error) {
        res.status(502).json("There was some error calculating number of times movie is favorited " + error.message)
    }
}

// Display fan favorite movies
exports.displayFanFavorites = async(req, res) => {
    try {
        const fanFavorites = await Movie.find({},'moviePoster movieName movieDirector movieStudio movieReleaseYear favorited').sort({favorited : -1}).limit(5).exec() // https://stackoverflow.com/questions/24348437/mongoose-select-a-specific-field-with-find
        res.status(200).json(fanFavorites)
    } catch (error) {
        res.status(502).json("Unable to get fan favorites " + error.message)
    }
}