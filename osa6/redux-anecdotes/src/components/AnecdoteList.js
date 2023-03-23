import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { voteNotification, setDefault } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const filteredAnecdotes = useSelector(({anecdotes, filter}) => {
        const filtering = [...anecdotes].filter(anecdote => 
            anecdote.content.toLowerCase().includes(filter))

        return filtering.sort((a,b) => {return b.votes-a.votes})
    })

    const dispatch = useDispatch()
    
    const voting = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))
        dispatch(voteNotification(anecdote.content))
        setTimeout(() => {
            dispatch(setDefault())
          }, 5000)
    }

    return (
        <div>
            {filteredAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voting(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList