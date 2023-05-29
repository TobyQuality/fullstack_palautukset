import { useRef  } from 'react'
import { useQuery } from 'react-query'
import Blog from './components/Blog'
import BlogsForm from './components/BlogsForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { useLoginValue, useLoginDispatch } from './LoginContext'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const loginValue = useLoginValue()
  const loginDispatch = useLoginDispatch()
  const notificationDispatch = useNotificationDispatch()

  const blogFormRef = useRef()

  const { data: blogs, isSuccess } = useQuery('blogs', blogService.getAll, {
    refetchOnWindowFocus: false,
    retry: 1,
  })
  const sortedBlogs = [].concat(blogs).sort((a, b) => b.likes - a.likes)
  
  const logout = () => {
    window.localStorage.clear()
    blogService.setToken('')
    loginDispatch({ type: 'LOGGED_OUT' })
    notificationDispatch({ type: 'LOG_OUT' })
    setTimeout(() => {
      notificationDispatch({ type: '' })
    }, 5000)
  }

  return (
    <div>
      <Notification/>
      {loginValue === null &&
        <LoginForm></LoginForm>
      }
      {loginValue != null &&
        <div>
          <h2>blogs</h2>
          <p>{loginValue.username} has logged in</p>
          <button onClick={logout}>logout</button>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogsForm/>
          </Togglable>
          <div>
            {
            isSuccess &&
            sortedBlogs.map(b =>
              <Blog key={b.id} blog={b} />)
            }
          </div>
        </div>
      }
    </div>
  )
}

export default App