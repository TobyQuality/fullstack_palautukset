const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const testblogs = require('./testblogs')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(testblogs)
})

describe('general tests', () => {

  test('there are six blogs in total', async () => {
    const response = await blogsInDb()
  
    expect(response.body).toHaveLength(testblogs.length)
  })

  test('the id property name must be "id" and not "_id"', async () => {
    const response = await api.get('/api/blogs')

    const body = response.body
    const blogObject = body[0]

    expect(blogObject.id).toBeDefined()
  })

})

describe('adding new blogs', () => {

  test('post method works properly', async() => {
    const testBlog = {
      title: "Test",
      author: "Testman",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      likes: 1234,
    }
  
    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const allBlogs = response.body
  
    expect(allBlogs).toHaveLength(7)
  
    expect(allBlogs[6].author).toBe('Testman')
  })
  
  test('the value of likes is zero, if its field is left empty', async() => {
    const testBlog = {
      title: "Another test",
      author: "Testson",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
  
    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(201)
  
    const response = await api.get('/api/blogs')
    const lastBlog = response.body[6]
  
    expect(lastBlog.likes).toBe(0)
  })
  
  test('if a new blog does not contain title or url, the status code will be 400', async() => {
    const testBlog = {
      author: "Tester",
      likes: 1
    }
  
    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(400)
  })

})

describe('deleting blogs', () => {

  test('deleting a blog according to its id works', async() => {
    //the first blog is selected for deletion,
    //after which the second blog will become the first
    const firstId = "5a422a851b54a676234d17f7"
    const secondId = "5a422aa71b54a676234d17f8"
  
    await api
          .delete(`/api/blogs/${firstId}`)
          .expect(204)
  
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]
  
    expect(firstBlog.id).toBe(secondId)
  })

})

describe('changing information of a blog', () => {

  test('updating the likes of a blog works', async() => {
    //the idea in this test is that whether the previous
    //test was executed or not (in which a blog was deleted)
    //the result will be the same. For that reason, it is
    //important to first add a new blog in the "database"
    //then do the update procedure to it
    const testBlog = {
      title: "let's update",
      author: "Updatus Maximus",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      likes: 10
    }
  
    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(201)
  
    let response = await api.get('/api/blogs')
    let body = response.body
    let lastBlog = body[body.length - 1]
  
    const updateLastBlog = {...lastBlog, likes: 20}
  
    await api
      .put(`/api/blogs/${lastBlog.id}`)
      .send(updateLastBlog)
      .expect(200)
  
    //lastly we need to get all the blogs one more time
    //to see, if the last blog's likes is 20 after the update
  
    response = await api.get('/api/blogs')
    body = response.body
    lastBlog = body[body.length - 1]
  
    expect(lastBlog.likes).toBe(20)
  })

})


afterAll(() => {
  mongoose.connection.close()
})