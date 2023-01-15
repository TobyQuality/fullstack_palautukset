const User = require('../models/user')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }
    next()
}

//always used after tokenExtractor, else it won't work
const userExtractor = async (request, response, next) => {
    if (request.method === "POST" || request.method === "DELETE") {
        const token = request.token
        // to prevent internal server error from happening,
        // it is important to first check if token is not undefined
        if (token) {
            const decodedToken = jwt.verify(token, process.env.SECRET)
            request.decodedTokensId = decodedToken.id
        }

        if (!token || !request.decodedTokensId) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
    }

    try {
        request.user = await User.findById(request.decodedTokensId)
    } catch(error) {
        return response.status(400).json({error: 'unexpected error occurred, please try again'})
    }

    next()
}

module.exports = { tokenExtractor, userExtractor }