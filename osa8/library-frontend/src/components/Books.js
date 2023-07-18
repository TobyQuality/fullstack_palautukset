import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries.js'

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const [genre, setGenre] = useState("all")
  // The code from here:
  // https://stackoverflow.com/questions/57568506/multiple-usequeries-in-a-single-component
  // has helped me to create a code that enables
  // making more than one queries per component
  // with the help of own custom hook

  const { loading: booksLoading, error: booksError, data: booksData } = useQuery(ALL_BOOKS, {
    variables: { genre: genre !== "all" ? genre : "" },
    pollInterval: 10000,
  })
  const { data: meData } = useQuery(ME)

  if (booksLoading ) {
    return <div>Loading...</div>
  }
  if (booksError ) {
    return <div>Error occurred while fetching data.</div>
  }

  let books = booksData?.allBooks ?? []
  let genresSet = new Set()
  books.map(b => 
    b.genres.map(g => genresSet.add(g))
  )
  const genres = Array.from(genresSet)

  const favoriteGenre = meData?.me?.favoriteGenre || ""

  return (
    <div>

      <h2>books</h2>

      <div>
      {genres.map(g => (
        <button key={g} onClick={() => setGenre(g)}>{g}</button>
        ))}
      <button key="recommended" onClick={() => setGenre(favoriteGenre)}>Recommended</button>
      <button key="all books" onClick={() => setGenre("all")}>All books</button>
      </div>
      
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(b => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Books