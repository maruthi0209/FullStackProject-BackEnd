const express = require('express')
const app = express()
// const fs = require("fs")
const bodyParser = require('body-parser')
// const multer  = require('multer')
const dotenv = require("dotenv").config()
const port = 3000
const mongoose = require("mongoose")
const UserModel = require("./Models/user")
const MovieModel = require("./Models/movie")
const ReviewModel = require("./Models/review")

const movieRoute = require("./Routes/movieRoute")
const userRoute = require("./Routes/userRoute")
const reviewRoute = require("./Routes/reviewRoute")
const actorRoute = require("./Routes/actorRoute")
const genreRoute = require("./Routes/genreRoute")
const hotTrendingRoute = require("./Routes/hotTrendingRoute")
const highestGrossingRoute = require("./Routes/highestGrossingRoute")

const jsonParser = bodyParser.json()
app.use(jsonParser)

const cors = require("cors")
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/newmoviedetails", jsonParser, async(req, res) => {
    // req.body.id = Date.now();
    // fs.writeFileSync("./Models/moviedetails.json",JSON.stringify(req.body));
    try {
        // const user = await new UserModel(req.body).save()
        // const movie = await new MovieModel(req.body).save()
        const review = await new ReviewModel(req.body).save()
        res.status(200).send(review)
    } catch (error) {
      res.status(500).send("Error \n"  + JSON.stringify(req.body) + error)
    }
    // res.status(200).send("Movie data saved. \n"  + JSON.stringify(req.body))
})

app.use("/movies", movieRoute)
app.use("/users", userRoute)
app.use("/reviews", reviewRoute)
app.use("/actors", actorRoute)
app.use("/genres", genreRoute)
app.use("/hottrending", hotTrendingRoute)
app.use("/highestgrossing", highestGrossingRoute)


// // to store the incoming file into the storage
// const storage = multer.diskStorage({
//     destination : function (req, file, cb) {cb (null, './Uploads/')},
//     filename : function (req, file, cb) {cb(null, file.originalname)}
// })
// const fileFilter = (req, file, cb) => {
//     const allowTypes = ["image/jpeg", "image/jpg", "image/png"] // these are the allowed file types.
//     if(allowTypes.includes(file.mimetype)) {
//         cb(null, true) // file is of allowed type
//     } else {
//         cb(new Error("invalid file type")) // throw new error
//     }
// }
// const upload = multer({storage:storage, fileFilter: fileFilter})
// app.post("/newmoviemedia", upload.single('poster'), (req, res) => {
//     // fs.writeFileSync("./Models/moviedetails.json",JSON.stringify(req.body));
//     console.log(req.file);
//     res.status(200).send("Movie media saved. \n"  + JSON.stringify(req.body) + JSON.stringify(req.file))
// })

mongoose.connect(process.env.MONGO_URI)
  .then(() => {app.listen(port, ()=> {console.log(`Example app listening on port ${port}`);})})
    .catch((err) => {console.log(err)})
// https://stackoverflow.com/questions/61302342/mongodb-sets-my-database-to-test-automatically-how-to-change-it
// https://www.mongodb.com/community/forums/t/objects-getting-auto-saved-in-test-database-instead-of-user-database/234137

// app.listen(port, ()=> {
//   console.log(`Example app listening on port ${port}`);
// })
