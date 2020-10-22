const express = require("express");
const router = express.Router();
require("dotenv").config();
const axios = require("axios");

const UserModel = require("../models/User.model");

//headlines
router.get("/headlines", (req, res) => {
  let API_KEY = process.env.API_KEY;

  axios
    .get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=1d4df6400c5944669c83089aee38bbc6`
    )
    .then((response) => {
      // console.log('immmmmmmmmmmmmmmmmmmmmmmm',response)
      let data = response.data.articles;

      res.render("headlines.hbs", { data });
    });
});

//category business
router.get("/business", (req, res) => {
  let API_KEY = process.env.API_KEY;

  axios
    .get(
      `https://newsapi.org/v2/top-headlines?category=business&apiKey=1d4df6400c5944669c83089aee38bbc6`
    )
    .then((response) => {
      // console.log('immmmmmmmmmmmmmmmmmmmmmmm',response)
      let data = response.data.articles;

      res.render("business.hbs", { data });
    });
});

// entertainment news
router.get("/entertainment", (req, res) => {
  let API_KEY = process.env.API_KEY;

  axios
    .get(
      `https://newsapi.org/v2/top-headlines?category=entertainment&apiKey=1d4df6400c5944669c83089aee38bbc6`
    )
    .then((response) => {
      // console.log('immmmmmmmmmmmmmmmmmmmmmmm',response)
      let data = response.data.articles;

      res.render("entertainment.hbs", { data });
    });
});

//health news
router.get("/health", (req, res) => {
  let API_KEY = process.env.API_KEY;

  axios
    .get(
      `https://newsapi.org/v2/top-headlines?category=health&apiKey=1d4df6400c5944669c83089aee38bbc6`
    )
    .then((response) => {
      // console.log('immmmmmmmmmmmmmmmmmmmmmmm',response)
      let data = response.data.articles;

      res.render("health.hbs", { data });
    });
});
//technology news
router.get("/technology", (req, res) => {
  let API_KEY = process.env.API_KEY;

  axios
    .get(
      `https://newsapi.org/v2/top-headlines?category=technology&apiKey=1d4df6400c5944669c83089aee38bbc6`
    )
    .then((response) => {
      // console.log('immmmmmmmmmmmmmmmmmmmmmmm',response)
      let data = response.data.articles;

      res.render("tech.hbs", { data });
    });
});
//Science news
router.get("/science", (req, res) => {
  let API_KEY = process.env.API_KEY;

  axios
    .get(
      `https://newsapi.org/v2/top-headlines?category=science&apiKey=1d4df6400c5944669c83089aee38bbc6`
    )
    .then((response) => {
      // console.log('immmmmmmmmmmmmmmmmmmmmmmm',response)
      let data = response.data.articles;

      res.render("science.hbs", { data });
    });
});
//everything news
router.get("/everything", (req, res) => {
  let API_KEY = process.env.API_KEY;
  let q = req.query.searchBar;

  axios
    .get(
      "https://newsapi.org/v2/everything?q=${q}&apiKey=1d4df6400c5944669c83089aee38bbc6"
    )
    .then((response) => {
      // console.log('immmmmmmmmmmmmmmmmmmmmmmm',response)

      let data = response.data.articles;

      res.render("everything.hbs", { data });
    });
});

router.get("/sources", (req, res) => {
  let API_KEY = process.env.API_KEY;

  axios
    .get(
      "https://newsapi.org/v2/sources?apiKey=1d4df6400c5944669c83089aee38bbc6"
    )
    .then((response) => {
      // console.log("immmmmmmmmmmmmmmmmmmmmmmm", response);

      let data = response.data.sources;

      res.render("sources.hbs", { data });
    });
});

module.exports = router;
