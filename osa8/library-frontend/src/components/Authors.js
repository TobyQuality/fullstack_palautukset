import { useState } from 'react'
import { useMutation  } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries.js'

const Authors = (props) => {
  if (!props.show) {
    return null
  }
  const authors = props.authors

  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]  
  })

  const submit = async (event) => {
    event.preventDefault()
    
    editAuthor({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birth year</h3>
      <form onSubmit={submit}>
        <div>
            <select value={name}
                    onChange={({target}) => setName(target.value)}>
              {authors.map((a) =>
                <option key={a.name} value={a.name}>{a.name}</option>
              )}
            </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={ ({ target }) => setBorn(Number.parseInt(target.value)) }
          />
        </div>
        <button type="submit">set birth year</button>
      </form>
    </div>
      </div>
  )
}

export default Authors
