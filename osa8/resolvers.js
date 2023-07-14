const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const pubsub = new PubSub()

const resolvers = {
    Query: {
      authorCount: async () => await Author.collection.countDocuments(),
      bookCount: async () => await Book.collection.countDocuments(),
      allBooks: async (root, args, context) => {
        const author = args.author
        const genre = args.genre
  
        let books = []
  
        if (genre === "all") {
          books = await Book.find({}).populate('author')
        }
        if (author && genre) {
          books = await Book.find({ author: author, genres: genre }).populate('author')
        }
        if (author) {
          books = await Book.find({ author: author }).populate('author')
        }
        if (genre) {
          books = await Book.find({ genres: genre }).populate('author')
        }
        if (!author && !genre) {
          books = await Book.find({}).populate('author')
        }
  
        return books
      },
      allAuthors: async () => {
        const allAuthors = await Author.find({})

        const countBooks = async (id) => {
          return await Book.countDocuments({ author: id })
        }
  
        const authorListWithBookCount = allAuthors.map(a => {
          const bookCount = countBooks(a.id)
          return {...a.toObject(), bookCount}
        })
        return authorListWithBookCount
      },
      me: (root, args, context) => {
        return context.currentUser
      }
    },
    Mutation: {
      addAuthor: async (root, args) => {
        if (args.born && typeof args.born !== 'number') {
          throw new GraphQLError('Invalid value for "born" field', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
  
        const author = new Author({ ...args })
  
        try {
          await author.save()
        }catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
        return author
      },
      addBook: async (root, args) => {
        try {
          let author = await Author.findOne({name: args.author})
  
          if (!author) {
            author = new Author({ name: args.author })
            await author.save()
          }
  
          const book = new Book({ ...args , author: author})
          await book.save()

          pubsub.publish('BOOK_ADDED', { bookAdded: book })
  
          return book
        } catch (error) { 
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      },
      editAuthor: async (root, args) => {
        const author = await Author.findOne({ name: args.name })
        author.born = args.born
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Editing birth year failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
        return author
      },
      createUser: async (root, args) => {
        const user = new User(
          { username: args.username, favoriteGenre: args.favoriteGenre }
        )
        try {
          return user.save()
        } catch (error) {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
  
        if ( !user || args.password !== 'secret' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })        
        }
  
        const userForToken = {
          username: user.username,
          id: user.id,
        }
  
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      },
    },
    Subscription: {    
      bookAdded: {      
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')    
      },  
    }
  }

  module.exports = resolvers 