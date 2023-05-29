import { createContext, useReducer, useContext } from 'react'

const initialState = JSON.parse(localStorage.getItem('loggedBlogappUser')) || null

const loginReducer = (state, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return {...state, user: action.payload.user,
                              username: action.payload.username,
                              id: action.payload.id,
                              token: action.payload.token}
        case 'LOGGED_OUT':
            return null
    }
}

const LoginContext = createContext()

export const LoginContextProvider = (props) => {
    const [login, loginDispatch] = useReducer(loginReducer, initialState)
  
    return (
      <LoginContext.Provider value={[login, loginDispatch] }>
        {props.children}
      </LoginContext.Provider>
    )
  }

  export const useLoginValue = () => {
    const loginAndDispatch = useContext(LoginContext)
    return loginAndDispatch[0]
  }  
  
  export const useLoginDispatch = () => {
    const loginAndDispatch = useContext(LoginContext)
    return loginAndDispatch[1]
  }
  
  export default LoginContext