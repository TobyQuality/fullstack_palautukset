const express = require('express')
require('express-async-errors')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/blogs', blogsRouter)

module.exports = app