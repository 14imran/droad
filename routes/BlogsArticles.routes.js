const cons = require('consolidate')
const express = require('express')
const Article = require('../models/Blogsarticle.model')
const router = express.Router()


router.get('/', async(req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' }).populate('author',['name','email'])
  
  // let showEdit = articles.author._id === req.session.loggedInUser._id
    res.render('blogs/articles/index', { articles: articles })
  // res.render('blogs/articles/index', { article:new Article()})

})

// new blog create
router.get('/new', (req, res) => {
  res.render('blogs/articles/new', { article: new Article() })
})

// edit the blogs
router.get('/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('blogs/articles/edit', { article: article })
})

router.get('/:slug', async (req, res) => {
  //author check if article author id =req.session.id{same show buttons }
  const article = await Article.findOne({ slug: req.params.slug })
  if (article == null) res.redirect('/articles')
  
  res.render('blogs/articles/show', { article: article })
})

router.post('/', async (req, res, next) => {
 
  req.article = new Article()
  next()
}, saveArticleAndRedirect('new'))

router.put('/edit/:id', async (req, res, next) => {
  req.article = await Article.findByIdAndUpdate({_id:req.params.id},req.body)
  next()
}, saveArticleAndRedirect('edit'))


//claps

router.put('/claps/:id', async (req, res, next) => {
  // req.article = await Article.findByIdAndUpdate({_id:req.params.id},req.body)
  let articleId = req.params.id
  try{
  await Article.findByIdAndUpdate({_id: articleId},  { $inc: { "claps" : 1 } }).exec()
  res.redirect('/articles')
  }
  catch(error){
    // console.log(error)
  }
  // .then((data)=>{
  //   console.log("data",data)
  //   res.redirect('/articles')
  // })
  // .catch((err)=>{
  //   console.log('err', err)
  // })
})

  // next()
// }, saveArticleAndRedirect('edit'))

// delete 
router.get('/:id/delete', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/articles')
})


// saving the articles and redirecting to /articles 
function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article

   article.author = req.session.loggedInUser._id
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
    try {
    //  console.log("req.",article)
      article = await article.save()
      res.redirect(`/articles`)
    } catch (e) {
      res.render(`articles/${path}`, { article: article })
    }
  }
}

module.exports = router