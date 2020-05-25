const mongoose = require('mongoose')
const Schema = mongoose.Schema

//DEFINE SCHEMA
const imagesSchema = new Schema(
    {
        files: {
            type: String
        }
    }
)

const Image = mongoose.model("Image", imagesSchema)
module.exports = Image