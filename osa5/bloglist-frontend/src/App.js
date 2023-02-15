import { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import BlogsForm from './components/BlogsForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blog, setBlog] = useState({title: '', author: '', url: ''})
  const [message, setMessage] = useState({msg: '', colorCode: 'green'})
  const blogFormRef = useRef()

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
      blogFormRef.current.toggleVisibility()
      setTimeout(() => {blogService.getAll().then(blogs =>
        setBlogs(blogs.sort((a, b) => b.likes - a.likes))
      )}, 500)
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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
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
      {!user && loginForm()}
      {user &&
        <div>
        <h2>blogs</h2>
        <p>{user.name} has logged in</p>
        <button onClick={logout}>logout</button>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogsForm
              createNewBlog={createNewBlog}
              blog = {blog}
              setBlog = {setBlog}
              blogs = {blogs}
              Blog = {Blog}
            />
          </Togglable>
          <div>
            {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} blogs={blogs} setBlogs={setBlogs}/>
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default App