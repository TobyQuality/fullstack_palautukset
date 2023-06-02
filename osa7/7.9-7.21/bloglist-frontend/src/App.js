import { useRef  } from 'react'
import { useQuery } from 'react-query'
import Blog from './components/Blog'
import BlogsForm from './components/BlogsForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import usersService from './services/users'
import User from './components/User'
import UsersList from './components/UsersList'
import { useLoginValue, useLoginDispatch } from './LoginContext'
import { useNotificationDispatch } from './NotificationContext'
import { Routes, Route, useMatch } from "react-router-dom"

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
  
  const result = useQuery('users', usersService.getUsers,
    { refetchOnWindowFocus: false },
    { retry: 1 }
  )
  const users = result.isSuccess 
    ? [].concat(result.data).sort((a, b) => b.blogs.length - a.blogs.length)
    : []

  const logout = () => {
    window.localStorage.clear()
    blogService.setToken('')
    loginDispatch({ type: 'LOGGED_OUT' })
    notificationDispatch({ type: 'LOG_OUT' })
    setTimeout(() => {
      notificationDispatch({ type: '' })
    }, 5000)
  }

  const match = useMatch('/users/:id')
  const user = match
    ? users.find(u => u.id === match.params.id)
    : null
    console.log(user)

  const MainView = () => {
    return (
      <div>
    {loginValue &&
      <div>
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

  return (
    <div>
      <Notification />
      {!loginValue &&
        <LoginForm></LoginForm>
      }
      {loginValue &&
      <div>
        <h2>Blogs</h2>
        <p>{loginValue.username} has logged in</p>
        <button onClick={logout}>logout</button>
      </div> 
      }
      <Routes>
        <Route path = "/" element={<MainView/>}></Route>
        <Route path="/users/:id" element={<User user = {user} />}></Route>
        <Route path="/users" element={<UsersList users={users} />}></Route>
      </Routes>
    </div>
  )
}

export default App