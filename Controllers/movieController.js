const Movie = require("../Models/movie")
const asyncHandler = require("express-async-handler")

// Display all movies list
exports.displayAllMoviesList = async(req, res) => {
    try {
        const allMovies = await Movie.find();
        res.status(200).json(allMovies);
    } catch (error) {
        res.status(502).json("Unable to fetch all movies list. " + error.message)
    }
}

// Display one movie
exports.displayMovieDetails = async(req, res) => {
    try {
        console.log((req.url.split("/")[2]))
        const movieDetail = await Movie.findById(req.url.split("/")[2]).exec()
        res.status(200).json(movieDetail)
    } catch (error) {
        res.status(502).json("Unable to get movie details based on id " + req.url)
    }
}

// Display movies based on a criteria like genre, actor, country, etc.
exports.displayMoviesBasedOnCriteria = asyncHandler(async(req, res, next) => {
    res.json("Here is the list of movies based on given criteria")
})
// exports.displayMoviesBasedOnCriteria = async(req, res) => {
//     try {
//         // const obj = {(Object.keys(Movie.schema.paths)).filter((path) => path.toLowerCase().includes((Object.keys(req.query)[0]))) : (Object.values(req.query))[0]}
//         // console.log({searchValue : (Object.values(req.query))[0]}) // google search for "iterating through schema fields mongoose"
//         console.log((Object.keys(Movie.schema.paths)).filter((path) => path.toLowerCase().includes((Object.keys(req.query)[0]))))
//         // const categoryMovies = await Movie.find(new Object({}))
//         console.log(categoryMovies)
//     } catch (error) {
//         res.status(502).json("Unable to get movie details based on given params")
//     }
// }

// Create a new movie
exports.createNewMovie = async(req, res) => {
    try {
        const savedMovie = await Movie.create(req.body)
        res.status(200).json("Movie details saved successfully " + savedMovie)
    } catch (error) {
        res.status(502).json("Unable to save movie details " + error.message)
    }
}

// Update an existing movie
exports.updateExistingMovie = async(req, res) => {
    try {
        let updatedMovieDetails = await Movie.replaceOne({_id : req.params.id}, req.body)
        res.status(200).json(`${updatedMovieDetails.matchedCount} entries matched count. ${updatedMovieDetails.modifiedCount} updated successfully. Acknowledged : ${updatedMovieDetails.acknowledged}.`)
    } catch (error) {
        res.status(502).json("Unable to update movie details " + error.message)
    }
}

// Delete existing movie Details
// exports.deleteExistingMovie = asyncHandler(async(req, res, next) => {
//     res.json("Here is the response when existing movie is deleted")
// })
exports.deleteExistingMovie = asyncHandler(async(req, res) => {
    try {
        await Movie.deleteOne({_id : req.params.id})
        res.status(200).send(`Movie with id: ${req.params.id} deleted successfully.`)
    } catch (error) {
        res.status(502).json("Unable to delete movie details " + error.message)
    }
})