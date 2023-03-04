const listHelper = require('../utils/list_helper')
const testBlogs = require('../utils/testblogs')

describe('dummy test', () => {
    test('dummy returns one', () => {
        const blogs = []
      
        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
      })
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const listWithOneBlog = [
            {
              _id: '5a422aa71b54a676234d17f8',
              title: 'Go To Statement Considered Harmful',
              author: 'Edsger W. Dijkstra',
              url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
              likes: 5,
              __v: 0
            }
          ]

        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(testBlogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
    test('favorite blog made by Dijkstra will be returned', () => {
        const dijkstrasBlog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
          }
      
        const favoriteBlog = listHelper.favoriteBlog(testBlogs)
        expect(favoriteBlog).toEqual(dijkstrasBlog)
      })
})

describe('most blogs', () => {
  test('find most the author with most blogs: Robert C. Martin', () => {
      const martin = {
        author: "Robert C. Martin",
        blogs: 3
      }
    
      const result = listHelper.mostBlogs(testBlogs)
      expect(result).toEqual(martin)
    })
})

describe('most likes', () => {
  test('returns the author with most likes: Dijkstra', () => {
      const dijkstra = {
        author: "Edsger W. Dijkstra",
        likes: 17
      }
    
      const result = listHelper.mostLikes(testBlogs)
      expect(result).toEqual(dijkstra)
    })

})