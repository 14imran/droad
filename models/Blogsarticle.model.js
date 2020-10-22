const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)
const Schema = mongoose.Schema
const articleSchema = new Schema({
  author :{
    type: Schema.Types.ObjectId, ref: 'User'
  },
  title: {
    type: String,
    required: true,
    
  },
  description: {
    type: String,
   
  },
  markdown: {
    type: String,
    required: true,
   
  },
  createdAt: {
    type: Date,
    default: Date.now,
    
  },
  slug: {
    type: String,
    required: true,
    unique: true,
   
  },
  sanitizedHtml: {
    type: String,
    required: true,
    
  },
  claps: {
    type : Number,
    default :0 
  },

  
    showEdit : {
      type :Boolean,
    }
  
  
})

articleSchema.pre('validate', function(next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }

  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
  }

  next()
})

module.exports = mongoose.model('Article', articleSchema)