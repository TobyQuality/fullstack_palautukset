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
        return [{
            ...state[0],
            visibility: 'visible',
          },
          'you created anecdote: ' + action.payload.content,
        ]
      case "CREATE_FAIL":
        return [{
            ...state[0],
            visibility: 'visible',
          },
          'too short anecdote, must have length 5 or more',
        ]
      case "VOTE":
        return [{
          ...state[0],
          visibility: 'visible',
        },
        'you voted anecdote: ' + action.payload.content,
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

export default NotificationContext