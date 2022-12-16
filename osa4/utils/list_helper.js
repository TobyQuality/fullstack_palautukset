const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map((blog) => blog.likes))

    const mostLikedBlog = blogs.find((blog) => {
        return blog.likes === mostLikes
    })

    return {
        title: mostLikedBlog.title,
        author: mostLikedBlog.author,
        likes: mostLikedBlog.likes
    }
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    const authorList = lodash.groupBy(authors, authors.author)
    const entries = Object.entries(authorList)
    const mostBlogs = Math.max(...entries.map((blog) => blog[1].length))
    const findMostBlogs = entries.find((entry) => {
        return entry[1].length === mostBlogs
    })
    return {
        "author": findMostBlogs[0],
        "blogs": findMostBlogs[1].length
    }
}

//credits belong to Mattias Petter Johansson and
//his video on reduce method for making this possible
const mostLikes = (blogs) => {
    const reducer = blogs.reduce((bloggers, blog) => {
        bloggers[blog.author] = bloggers[blog.author] || []
        bloggers[blog.author].push({
            likes: blog.likes
        })
        return bloggers
    }, {})
    return reducer
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}