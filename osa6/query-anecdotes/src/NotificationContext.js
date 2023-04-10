import { createContext, useReducer, useContext } from 'react'

const initialState = [{
    borderStyle: 'solid',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    visibility: 'hidden',
  }, '']

const notificationReducer = (state, action) => {
    switch (action.type) {
      case "CREATE_SUCCESS":
        state[0] = {...state[0], visibility: 'visible'}
        state[1] = 'you created anecdote: ' + action.payload
        return state
      case "CREATE_FAIL":
        state[0] = {...state[0], visibility: 'visible'}
        state[1] = 'too short anecdote, must have length 5 or more'
        return state
      default:
        state[0] = {...state[0], visibility: 'hidden'}
        state[1] = ''
        return state
    }
  }

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)

  return (
      <NotificationContext.Provider value={[notification, notificationDispatch] }>
        {props.children}
      </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
const notificationAndDispatch = useContext(NotificationContext)
return notificationAndDispatch[1]
}

export default NotificationContext