const express = require("express");
const router = express.Router();
require("dotenv").config();
const axios = require("axios");
const UserModel = require("../models/User.model");

/* GET home page */
//    /search

router.get("/", (req, res, next) => {
  let API_KEY = process.env.API_KEY;
  let q = req.query.searchBar;
  console.log(q);
  axios
    .get(
      `https://newsapi.org/v2/everything?q=${q}&apiKey=1d4df6400c5944669c83089aee38bbc6`
    )
    .then((response) => {
      // console.log('immmmmmmmmmmmmmmmmmmmmmmm',response)
      let data = response.data.articles;
      console.log(req.body);
      res.render("search.hbs", { data }); //"search.hbs",
    });
});

module.exports = router;
