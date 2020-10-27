//import required packages and modules
const express = require('express')
const mongoose = require('mongoose')
const shortUrl = require('./models/shortUrl')

//initialize the server
const app = express()

//connect to the database
mongoose.connect('mongodb://localhost/miniUrl',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

//set template engine
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))

//ROUTES

//GET '/' => display homepage,render index.ejs
app.get('/',async(req,res)=>{
  const urlList = await shortUrl.find()
  res.render('index',{shortUrls:urlList})
})

//POST '/shortUrls' => create short Url and add to database
app.post('/shortUrls' , async (req,res) =>{
await shortUrl.create({
    fullUrl:req.body.fullUrl
})
res.redirect('/')
})

//GET ':/shortUrl' => click on the short url to go to the specified url
//increment clicks and save in database
app.get('/:shortUrl',async(req,res)=>{
 const trueUrl = await shortUrl.findOne({shortUrl: req.params.shortUrl})
 if(trueUrl == null)
 return res.sendStatus(404)

 trueUrl.clicks++;
 trueUrl.save()

 res.redirect(trueUrl.fullUrl)
})

//start server
app.listen(process.env.PORT || 5000);