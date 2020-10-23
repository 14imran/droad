const express = require("express");
const router = express.Router();
var bcrypt = require("bcryptjs");
const UserModel = require("../models/User.model");
const Article = require("../models/Blogsarticle.model");
// let data = require("./BlogsArticles.routes");
const cons = require("consolidate");
const session = require("express-session");
// console.log(data.keys)
// signup
router.get("/signup", (req, res) => {
  res.render("auth/signup.hbs");
});

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res
      .status(500)
      .render("auth/signup.hbs", { message: "Please enter all details" });
    return;
  }
  // hasing passwork using bcrypt
  bcrypt.genSalt(10).then((salt) => {
    bcrypt.hash(password, salt).then((hashedPassword) => {
      UserModel.create({
        name,
        email,
        password: hashedPassword,
      }).then(() => {
        console.log(hashedPassword, name, email);
        res.redirect("/login");
      });
    });
  });
});
// login
router.get("/login", (req, res) => {
  res.render("auth/login.hbs");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email: email }).then((userData) => {
    console.log(userData);
    bcrypt.compare(password, userData.password).then((result) => {
      //check if result is true
      if (result) {
        // userName = userData.name
        req.session.loggedInUser = userData;
        res.redirect("/dashboard");
      } else {
        res
          .status(500)
          .render("auth/login.hbs", { message: "Passwords not matching" });
      }
    });
  });
});

//logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

//dashb
router.get("/dashboard", async (req, res) => {
  //show dashboard page
  let isUser
  try {
    const articles = await Article.find()
      .sort({ createdAt: "desc" })
      .populate("author", ["name", "email"]);
articles.forEach((eachArticle)=>{
if (JSON.stringify(  req.session.loggedInUser._id) ===JSON.stringify( eachArticle.author._id)) {

  eachArticle["isUser"] = true;
} else {
  eachArticle["isUser"]  = false;
}

})

    res.render("dashboard.hbs", {
      name: req.session.loggedInUser.name,
      articles: articles,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
