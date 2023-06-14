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
import {Button, AppBar, Toolbar, IconButton, Container, Table, TableBody,
  TableCell, TableContainer, TableRow, Paper } from '@mui/material'

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
    return (
    <div>
    {loginValue &&
      <BlogsForm/>}
    {loginValue &&
      <TableContainer component={Paper}>
      <Table>
      <TableBody>
          {
          isSuccess &&
          sortedBlogs.map(b =>
            <TableRow key={b.id}>
              <TableCell>
              <Link to={`/blogs/${b.id}`}>{b.title}</Link>
              </TableCell>
              <TableCell>
              {b.author}
              </TableCell>
            </TableRow>)
          }
      </TableBody>
      </Table>
      </TableContainer>
    }
  </div>
    )
  }

  return (
    <Container>
    <div>
      <Notification />
      {!loginValue &&
        <LoginForm />
      }
      {loginValue &&
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
          </IconButton>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
          <Button onClick={logout} color="inherit">
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      }
      <Routes>
        <Route path="/" element={<MainView/>}></Route>
        <Route path="/blogs" element={<MainView/>}></Route>
        <Route path="/blogs/:id" element={<Blog blog={blog}/>}></Route>
        <Route path="/users" element={<UsersList users={users} />}></Route>
        <Route path="/users/:id" element={<User user={user} />}></Route>
      </Routes>
    </div>
    </Container>
  )
}

export default App