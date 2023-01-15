const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

//can be used in new tests
const users = async () => {
    const users = await User.find({})

    if (users.length >= 1) {
        return users.map(u => u.toJSON())
    }else {
        testUser = {
            'username': 'test',
            'name': 'John',
            'password': 'Johnson',
        }
    
        await api
            .post('/api/users')
            .send(testUser)
    }
}

describe('validation tests', () => {

    test('users with too short username or password, and non-unique usernames, are not created', async() => {
        invalidUser1 = {
            "username" : "yo",
            "name" : "Yo Man",
            "password" : "password",
        }
        invalidUser2 = {
            "username" : "yoman",
            "name" : "Yo Man",
            "password" : "pa",
        }
        invalidUser3 = {
            'username': 'test',
            'name': 'John',
            'password': 'Johnson',
        }

        // too short username will not be saved
        const response1 = await api
            .post('/api/users')
            .send(invalidUser1)
            expect(response1.status).toEqual(400)
            expect(response1.body.error).toEqual('user name must be at least 3 characters long')

        //too short password will not be saved
        const response2 = await api
            .post('/api/users')
            .send(invalidUser2)
            expect(response2.status).toEqual(400)
            expect(response2.body.error).toEqual('password must be at least 3 characters long')
        
        //username that is found in the database already
        //will not be saved
        const response3 = await api
            .post('/api/users')
            .send(invalidUser3)
            expect(response3.status).toEqual(400)
            expect(response3.body.error).toEqual('username must be unique')
    })

}) 


afterAll(() => {
    mongoose.connection.close()
})