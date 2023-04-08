import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const asObject = (anecdote) => {
    return {
      content: anecdote,
      votes: 0
    }
  }
    const object = asObject(content)
    const response = await axios.post(baseUrl, object)
    return response.data
}

const voteAnecdote = async (id) => {
  const anecdotes = await getAll()
  const anecdoteMatch = anecdotes.find(anecdote => id === anecdote.id)
  anecdoteMatch.votes++
  const response = await axios.put(baseUrl + '/' + id, anecdoteMatch)
  return response.data
}



export default { getAll, createNew, voteAnecdote }