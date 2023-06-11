import { createContext, useReducer, useContext } from 'react'

const initialState = ['', '']

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'CREATE_SUCCESS':
    return ['success',
    'New blog ' + action.payload.title + ' by ' + action.payload.author + ' created.',
    ]
  case 'CREATE_FAIL':
    return ['error',
    'creating new blog failed',
    ]
  case 'LOG_IN_SUCCESS':
    return ['success',
    action.payload.username +  ' has logged in successfully',
    ]
  case 'LOG_IN_FAIL':
    return ['error',
    'wrong credentials',
    ]
  case 'LOG_OUT':
    return ['success',
    'Logged out successfully',
    ]
  default:
    return ['',
    '',
    ]
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)

  return (
    <NotificationContext.Provider value={ [notification, notificationDispatch] }>
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