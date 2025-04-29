const mongoose = require("mongoose")
const hotTrendingSchema = mongoose.Schema(
    {
        trendingTopicName : {type : String, required : [true, "require trending topic name"]},
        trendingTopicLink : {type : String, required : [true, "require trending topic link"]},
        trendingTopicDesc : {type : String, required : [true, "require trending topic description"]},
        trendingTopicMovie : {type : mongoose.Schema.Types.ObjectId, required : [true, "require trending topic movie"]}
    }
)

const hotTrending = mongoose.model("hotTrending", hotTrendingSchema)
module.exports = hotTrending