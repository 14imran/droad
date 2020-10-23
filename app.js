require('dotenv').config();
require('./configs/db.config')
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

//server.js blogs articles
const Article = require('./models/Blogsarticle.model')
const articleRouter = require('./routes/BlogsArticles.routes')
const methodOverride = require('method-override')
//end


const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//session
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
 
app.use(session({
    secret: 'NotMyAge',
    saveUninitialized: false, 
    resave: false,
    cookie : {
        maxAge: 24*60*60*1000 //in milliseconds
    }, 
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24*60*60 //in seconds = 1day 
    })
}));

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

//view engile from blogs articles server.js
// app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

//for currentuser middleware
app.use(function(req,res,next){
  res.locals.currentUser = req.session

  next();
})


const index = require('./routes/index');
app.use('/', index);


const authSign = require("./routes/auth.routes");
app.use("/", authSign);


const newsRoutes = require("./routes/news.routes");
app.use("/", newsRoutes);


const searchRoutes = require("./routes/seacrh.routes");
app.use("/search", searchRoutes);

//blogs server.js

// app.get('/', async (req, res) => {
//   const articles = await Article.find().sort({ createdAt: 'desc' })
//   res.render('articles/index', { articles: articles })
// })

// app.use('/articles', articleRouter)

// mail

const mailRoutes = require("./routes/mail.routes");
app.use("/mail",mailRoutes);

const articleRoutes = require("./routes/BlogsArticles.routes");
app.use("/articles",articleRoutes);




module.exports = app;
