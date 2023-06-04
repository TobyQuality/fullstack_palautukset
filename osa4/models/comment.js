const mongoose = require('mongoose')
const config = require('../utils/config')

const commentSchema = mongoose.Schema({
    blogId: String,
    comment: String,
  })

  commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Comment = mongoose.model('Comment', commentSchema)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

module.exports = Comment