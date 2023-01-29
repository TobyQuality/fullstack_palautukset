import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blog, setBlog] = useState({title: '', author: '', url: ''})
  const [message, setMessage] = useState({msg: '', colorCode: 'green'})

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setMessage({...message, msg: `logged in successfully`})
      setTimeout(() => {setMessage({...message, msg: ''})}, 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({msg: `wrong credentials`, colorCode: 'red'})
      setTimeout(() => {setMessage({msg: '', colorCode: 'green'})}, 5000)
      
    }
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken('')
    setMessage({...message, msg: `logged out successfully`})
    setTimeout(() => {setMessage({...message, msg: ''})}, 5000)
  }

  const createNewBlog = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.create(blog)
      setBlogs(blogs.concat(response))
      setMessage({...message, msg: `a new blog ${blog.title} by ${blog.author} added`})
      setTimeout(() => {setMessage({...message, msg: ''})}, 5000)
      setBlog({title: '', author: '', url: ''})
    } catch (exception) {
      setMessage({msg: `creating a new blog failed`, colorCode: 'red'})
      setTimeout(() => {setMessage({msg: '', colorCode: 'green'})}, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
      <div>
        username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={ ({ target }) => setUsername(target.value) }
        />
      </div>
      <div>
        password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
  )

  const blogsForm = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} has logged in</p>
      <button onClick={logout}>logout</button>
      <h2>create new blog</h2>
      <form onSubmit={createNewBlog}>
        <div>
          title:
          <input
          type="text"
          value={blog.title}
          name="title"
          onChange={ ({ target }) => setBlog({...blog, title: target.value}) } 
          />
        </div>
        <div>
          author:
        <input
          type="text"
          value={blog.author}
          name="author"
          onChange={ ({ target }) => setBlog({...blog, author: target.value}) } 
          />
        </div>
        <div>
          url:
        <input
          type="text"
          value={blog.url}
          name="url"
          onChange={ ({ target }) => setBlog({...blog, url: target.value}) } 
          />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
    <Notification message={message} />
    {user === null ?
      loginForm() :
      blogsForm()
    }
    </div>
  )
}

export default App