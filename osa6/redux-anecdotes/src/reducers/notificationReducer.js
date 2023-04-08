import { createSlice } from '@reduxjs/toolkit'

const initialState = [{
    borderStyle: 'solid',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    visibility: 'hidden',
  }, '']

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(state, action) {
            console.log(action.payload)
            state[0] = {...state[0], visibility: 'visible'}
            state[1] = 'you added ' + action.payload
            return state
        },
        voteNotification(state,action) {
            state[0] = {...state[0], visibility: 'visible'}
            state[1] = 'you voted ' + action.payload
            return state
        },
         removeNotification(state, action) {
            state[0] = {...state[0], visibility: 'hidden'}
            state[1] = ''
            return state
        },
    }
})

export const setNewNotification = (content, time) => {
    return dispatch => {
        dispatch(createNotification(content))
        setTimeout(() => {
            dispatch(removeNotification())
         }, time * 1000)
    }
  }

  export const setNotificationVote = (content, time) => {
    return dispatch => {
        dispatch(voteNotification(content))
        setTimeout(() => {
            dispatch(removeNotification())
         }, time * 1000)
    }
  }

export const {createNotification, voteNotification, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer