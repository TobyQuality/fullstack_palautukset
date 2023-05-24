import { useState, useEffect, useRef  } from 'react'
import { useQuery } from 'react-query'
import Blog from './components/Blog'
import BlogsForm from './components/BlogsForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  const blogFormRef = useRef()
  const dispatch = useNotificationDispatch()

  const { data: blogs, isSuccess } = useQuery('blogs', blogService.getAll, {
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const sortedBlogs = [].concat(blogs).sort((a, b) => b.likes - a.likes)               

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
      dispatch({ type: 'LOG_IN_SUCCESS', payload: { username: user.username } })
      setTimeout(() => {
        dispatch({ type: '' })
      }, 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch({ type: 'LOG_IN_FAIL' })
      setTimeout(() => {
        dispatch({ type: '' })
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken('')
    dispatch({ type: 'LOG_OUT', payload: { username: user.username } })
    setTimeout(() => {
      dispatch({ type: '' })
    }, 5000)
  }

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
      <Notification/>
      {!user &&
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        >
        </LoginForm>}
      {user &&
        <div>
          <h2>blogs</h2>
          <p>{user.name} has logged in</p>
          <button onClick={logout}>logout</button>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogsForm/>
          </Togglable>
          <div>
            {
            isSuccess &&
            sortedBlogs.map(b =>
              <Blog key={b.id} blog={b} user={user}/>)
            }
          </div>
        </div>
      }
    </div>
  )
}

export default App