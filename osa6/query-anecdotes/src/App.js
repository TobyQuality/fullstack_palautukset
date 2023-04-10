import { useQuery, useMutation, useQueryClient  } from 'react-query'

import { getAnecdotes, updateAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()
  
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = async (content) => {
    updateAnecdoteMutation.mutate({ ...content, 
      "votes": content.votes + 1 })
  }

  const result = useQuery('anecdotes', getAnecdotes,
    { refetchOnWindowFocus: false },
    { retry: 1 }
  )

  if ( result.isLoading ) {    
    return <div>loading data...</div>  
  }

  if (result.isError) {
    console.log(result.error.message)
    return (
      <div>
        Error: {result.error.message}
      </div>
    )
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map( anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
