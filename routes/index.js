const express = require('express');
const router  = express.Router();
const UserModel = require("../models/User.model");
require("dotenv").config();
const axios = require("axios");
/* GET home page */
router.get('/', (req, res, next) => {

  let API_KEY = process.env.API_KEY;

  axios
    .get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=1d4df6400c5944669c83089aee38bbc6`
    )
    .then((response) => {
      // console.log('immmmmmmmmmmmmmmmmmmmmmmm',response)
      let data = response.data.articles;

      res.render("index.hbs", { data });
    });

});

module.exports = router;
