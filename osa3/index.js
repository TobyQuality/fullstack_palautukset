require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Contact = require('./models/contact')

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
morgan.token('post-content', (req, res) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-content'))
//console.log("testi")

//ROUTES (BEGINS HERE)//

app.get('/api/persons', (req, res, next) => {
  Contact.find({}).then(contacts => {
    res.json(contacts)
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then(contact => {
      if (contact) {
        res.json(contact)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
  let numberOfContacts = 0
  Contact.find({}).then(contacts => {
    contacts.forEach(contact => {
      //console.log(numberOfContacts)
      numberOfContacts++
    })
  }).then(result => {
    res.send(`<div><p>Phonebook has info for ${numberOfContacts} persons</p><p>${new Date()}</p></div>`)
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

//OLD VERSION FOR POST METHOD
/*
app.post('/api/persons', (req, res, next) => {
    const body = req.body
    let queryResult = 0
    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'content missing' })
    }
    Contact.find({name: body.name}).then(contacts => {
        queryResult = contacts.length
    }).then(result => {
        if (queryResult > 0) {
            return res.status(400).json({error: 'name must be unique'})
        } else {
            const contact = new Contact({
                name: body.name,
                number: body.number,
            })
            contact.save().then(savedContact => {
                res.json(savedContact)
            })
        }
    })
    .catch(error => next(error))
})
*/

//PRESENT VERSION
app.post('/api/persons', (req, res, next) => {
  const body = req.body
  const contact = new Contact({
    name: body.name,
    number: body.number,
  })
  contact.save().then(savedContact => {
    res.json(savedContact)
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const contact = {
    name: body.name,
    number: body.number,
  }

  Contact.findByIdAndUpdate(req.params.id, contact, { new: true, runValidators: true, context: 'query' } )
    .then(updatedContact => {
      res.json(updatedContact)
    })
    .catch(error => next(error))
})

//ROUTES (ENDS HERE)//

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

//ERROR HANDLER MIDDLEWARE
const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)
//ERROR HANDLER MIDDLEWARE 

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})