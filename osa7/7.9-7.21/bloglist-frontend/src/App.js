import { useQuery } from 'react-query'
import Blog from './components/Blog'
import BlogsForm from './components/BlogsForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import usersService from './services/users'
import User from './components/User'
import UsersList from './components/UsersList'
import { useLoginValue, useLoginDispatch } from './LoginContext'
import { useNotificationDispatch } from './NotificationContext'
import { Link, Routes, Route, useMatch } from "react-router-dom"

const App = () => {
  const loginValue = useLoginValue()
  const loginDispatch = useLoginDispatch()
  const notificationDispatch = useNotificationDispatch()

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

  const userMatch = useMatch('/users/:id')
  const user = userMatch
    ? users.find(u => u.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null

  const MainView = () => {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5,
    }
    return (
      <div>
    {loginValue &&
      <div>
        <BlogsForm/>
        <div>
          {
          isSuccess &&
          sortedBlogs.map(b =>
            <Link to={`/blogs/${b.id}`}>
              <div style={blogStyle}><a href="">{b.title} {b.author}</a></div>
            </Link>)
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
        <LoginForm />
      }
      {loginValue &&
      <div>
        <div>
           <Link style={{padding: '2px'}} to="/users">users</Link>
           <Link style={{padding: '2px'}} to="/blogs">blogs</Link>
        </div>
        <h2>Blogs</h2>
        <p>{loginValue.username} has logged in</p>
        <button onClick={logout}>logout</button>
      </div> 
      }
      <Routes>
        <Route path="/" element={<MainView/>}></Route>
        <Route path="/blogs" element={<MainView/>}></Route>
        <Route path="/blogs/:id" element={<Blog blog={blog}/>}></Route>
        <Route path="/users" element={<UsersList users={users} />}></Route>
        <Route path="/users/:id" element={<User user={user} />}></Route>
      </Routes>
    </div>
  )
}

export default App