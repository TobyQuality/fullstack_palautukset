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
    //the method reducer returns an object with
    //name properties (of the authors) that have arrays.
    //the arrays in turn have objects inside
    //that store likes of each blogs.
    const reducer = blogs.reduce((bloggers, blog) => {
        bloggers[blog.author] = bloggers[blog.author] || []
        bloggers[blog.author].push({
            likes: blog.likes
        })
        return bloggers
    }, {})

    //next the authors and arrays containing likes are put
    //in their own separate arrays and their contents will be pushed
    //in authorsAndLikes array in the for-loop
    authors = Object.keys(reducer)
    blogArrays = Object.values(reducer)
    authorsAndLikes = []

    for (i=0; i < authors.length; i++) {
        likes = 0
        blogArray = blogArrays[i]
        for (j=0; j < blogArray.length; j++) {
            likes += blogArray[j].likes
        }
        authorsAndLikes.push({'author': authors[i], 'likes': likes})
    }

    const likesOfTheMostLikedBlogger = Math.max(...authorsAndLikes.map((author) => author.likes))

    //in the next for-loop each likes are compared to the most liked bloggers
    //likes. If there is a match, an object containing properties' of the author's name
    //and their likes is returned.
    let authorWithMostLikes = {}
    for (i=0; i < authorsAndLikes.length; i++) {
        if (authorsAndLikes[i].likes === likesOfTheMostLikedBlogger) {
            authorWithMostLikes = authorsAndLikes[i]
            break
        }
    }

    return authorWithMostLikes
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}