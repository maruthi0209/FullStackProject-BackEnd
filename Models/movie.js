const mongoose = require("mongoose")
const movieSchema = mongoose.Schema(
    {
        movieName : {type : String, required: [true, "Require movie name"]},
        movieReleaseDate : {type : String, required: [true, "Require movie release date"]},
        movieReleaseYear : {type : Number, required: [true, "Require movie release year"]},
        movieCountry : {type : String, required : [true, "Require movie country of origin"] },
        movieDirector : {type : String, required : [true, "Require movie director name"]},
        movieWriter : {type : String, required : [true, "Require movie writer name"]},
        movieProducer : {type : String, required : [true, "Require movie producer name"]},
        movieStudio : {type : String, required : [true, "Require movie studio name"]},
        movieRunningTimeInMinutes : {type : Number, required : [true, "Require movie runtime"]},
        movieGenre : [{type : mongoose.Schema.Types.ObjectId, ref : 'GenreModel', required : [true, "Require genre list"]}],
        movieActors : [{type : mongoose.Schema.Types.ObjectId, ref : 'ActorModel', required : [true, "Require movie cast list"]}], 
        // GenreModel : [{type : Array, required : [true, "Require genre list"]}],
        // ActorModel : [{type : Array, required : [true, "Require movie cast list"]}],
        moviePoster : {type : String, required : [true, "Require movie poster link"]},
        movieTrailer : {type : String, required : [true, "Require movie trailer link"]},
        movieCollectionInMillions : {type : Number, required : [true, "Require movie collection numbers in million"]},
        movieAverageRating : {type : Number}
    },{
        strictPopulate: false
    },
    {
        timestamps : true
    } 
)

const MovieModel = mongoose.model("MovieModel", movieSchema) 
module.exports = MovieModel 