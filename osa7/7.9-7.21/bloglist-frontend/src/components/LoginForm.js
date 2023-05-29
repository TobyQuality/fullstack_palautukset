import blogService from '../services/blogs'
import loginService from '../services/login'
import { useNotificationDispatch } from '../NotificationContext'
import { useLoginDispatch } from '../LoginContext'

const LoginForm = () => {
  const dispatchNotification = useNotificationDispatch()
  const dispatchLogin = useLoginDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = { password: event.target.password.value,
                     username: event.target.username.value }
      const loggedInUser = await loginService.login(user)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loggedInUser)
      )
      blogService.setToken(loggedInUser.token)
      dispatchNotification({ type: 'LOG_IN_SUCCESS', payload: { username: loggedInUser.username } })
      dispatchLogin({ type: 'LOGGED_IN', 
                      payload: { user: loggedInUser.user,
                                 username: loggedInUser.username,
                                 id: loggedInUser.id,
                                 token: loggedInUser.token } })
      event.target.password.value  = ''
      event.target.username.value = ''
      setTimeout(() => {
        dispatchNotification({ type: '' })
      }, 5000)
    } catch (exception) {
      dispatchNotification({ type: 'LOG_IN_FAIL' })
      event.target.password.value  = ''
      event.target.username.value = ''
      setTimeout(() => {
        dispatchNotification({ type: '' })
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            id="username"
            name="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            id="password"
            name="password"
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )
}

export default LoginForm