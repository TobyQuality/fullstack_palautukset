import { useMutation, useQueryClient  } from 'react-query'

import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: response => {
      const anecdotesLoaded = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotesLoaded.concat(response.data))
      dispatch({type: 'CREATE_SUCCESS', payload: response.data})
      setTimeout(() => {
        dispatch({type: ''})
      }, 5000)
    },
    onError: error => {
      dispatch({type: 'CREATE_FAIL'})
      setTimeout(() => {
        dispatch({type: ''})
      }, 5000)
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
