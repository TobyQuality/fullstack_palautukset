import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    appendAnecdote(state, action) {
      console.log(JSON.parse(JSON.stringify(state)))
      state.push(action.payload)
    },
    setAnecdotes(state, action) 
    {      
      return action.payload    
    },
    updateAnecdotes(state, action) {
      return [...state].map(anecdote => action.payload.id === anecdote.id
        ? anecdote = action.payload : anecdote)
    }
  }
})

export const { appendAnecdote, setAnecdotes, updateAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))  
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
   const votedAnecdote = await anecdoteService.voteAnecdote(id)
   dispatch(updateAnecdotes(votedAnecdote))
  }
}

export default anecdoteSlice.reducer