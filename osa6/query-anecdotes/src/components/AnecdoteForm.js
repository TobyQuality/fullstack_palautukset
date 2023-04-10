import { useMutation, useQueryClient  } from 'react-query'

import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
      dispatch('CREATE_SUCCESS')
      // the following codes below make the app crash, so they are in comments
      console.log(newAnecdote)
      const anecdotesLoaded = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotesLoaded.concat(newAnecdote))  
    },
    onError: (error) => {
      dispatch('CREATE_FAIL')
      setTimeout(() => {
        dispatch('')
      }, 3000)
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
