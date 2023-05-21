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
  case 'CREATE_SUCCESS':
    return [{
      ...state[0],
      visibility: 'visible',
    },
    'New blog ' + action.payload.title + ' by ' + action.payload.author + ' created.',
    ]
  case 'CREATE_FAIL':
    return [{
      ...state[0],
      visibility: 'visible',
    },
    'creating new blog failed',
    ]
  case 'LOG_IN_SUCCESS':
    return [{
      ...state[0],
      visibility: 'visible',
    },
    action.payload.username +  ' has logged in successfully',
    ]
  case 'LOG_IN_FAIL':
    return [{
      ...state[0],
      visibility: 'visible',
    },
    'wrong credentials',
    ]
  case 'LOG_OUT':
    return [{
      ...state[0],
      visibility: 'visible',
    },
    action.payload.username +  ' has logged out successfully',
    ]
  default:
    return [{
      ...state[0],
      visibility: 'hidden',
    },
    '',
    ]
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

/*

    dispatch({ type: 'LOG_OUT', payload: { username: user.username } })
    setTimeout(() => {
      dispatch({ type: '' })
    }, 5000)

*/

export default NotificationContext