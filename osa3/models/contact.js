const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, 'User name required'],
    unique: true,
  },
  number: {
    type: String,
    required: [true, 'User phone number required'],
    minlength: 8,
    validate: { 
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v)
      }
      ,message: v => `${v.value} is not a valid phone number! Make sure you have the correct form of the prefix (starts with "01-" or "012-" for example)`
    },
    unique: true,
  },
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)