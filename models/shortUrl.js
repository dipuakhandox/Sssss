//This file contains the schema for the URLs to be stored in database
//shortid package is used to generate shortened URLs

const mongoose = require('mongoose')
const shortId = require('shortid');


const shortUrlSchema = new mongoose.Schema({
    fullUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true,
        default:shortId.generate
    },
    clicks:{
        type:Number,
        required:false,
        default:0
    }
})

module.exports = mongoose.model('ShortUrl',shortUrlSchema);