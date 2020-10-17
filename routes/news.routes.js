const express = require("express");
const router = express.Router();
require('dotenv').config();
const  axios = require('axios')

const UserModel = require("../models/User.model");




router.get('/headlines',(req,res)=>{
  let API_KEY = process.env.API_KEY


  axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=1d4df6400c5944669c83089aee38bbc6')
  .then((response)=>{
        // console.log('immmmmmmmmmmmmmmmmmmmmmmm',response)
        let data = response.data.articles
       
        res.render('headlines.hbs',{data})
  })
})

router.get('/everything',(req,res)=>{
  let API_KEY = process.env.API_KEY


  axios.get('https://newsapi.org/v2/everything?q=bitcoin&apiKey=1d4df6400c5944669c83089aee38bbc6')
  .then((response)=>{
        // console.log('immmmmmmmmmmmmmmmmmmmmmmm',response)
   
        let data = response.data.articles
     
        res.render('everything.hbs',{data})
  })
})

router.get('/sources',(req,res)=>{
  let API_KEY = process.env.API_KEY


  axios.get('https://newsapi.org/v2/sources?apiKey=1d4df6400c5944669c83089aee38bbc6')
  .then((response)=>{
        console.log('immmmmmmmmmmmmmmmmmmmmmmm',response)
   
        let data = response.data.sources
     
        res.render('sources.hbs',{data})
  })
})


module.exports = router;
