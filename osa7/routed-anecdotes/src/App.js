import { useState, useEffect } from 'react'
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useMatch
} from "react-router-dom"
import  { useField } from './hooks'

const Menu = ( {anecdotes, addNew, anecdote, field} ) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create-new">create new</Link>
      <Link style={padding} to="/about">about</Link>

      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>} />
        <Route path="/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/create-new" element={<CreateNew addNew={addNew} field={field}/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </div>
  )
}

const Anecdote = ({anecdote}) => {
  return (
    <div>
      <div><h2>{anecdote.content} by {anecdote.author}</h2></div>
      <div>has {anecdote.votes} votes</div>
      <br/>
      <div>For more info see: <a href={anecdote.info}>{anecdote.info}</a></div>
      <br/>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
      <li key={anecdote.id} >
        <Link to={`/${anecdote.id}`}>
          {anecdote.content}
        </Link>
      </li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = ( {addNew} ) => {
  const navigate = useNavigate()

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content.value} onChange={(e) => content.onChange(e)} />
        </div>
        <div>
          author
          <input name='author' value={author.value} onChange={(e) => author.onChange(e)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info.value} onChange={(e) => info.onChange(e)} />
        </div>
        <div>
          <button type="submit">create</button>
          <button type="button" onClick = { () => {content.reset(); author.reset(); info.reset()} }>reset</button>
        </div>
      </form>
    </div>
  )

}

const App = () => {

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState(false)

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(false);
      }, 5000);
    }
  }, [notification]);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification("A new anecdote " + anecdote.content + " has been created!")
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes} anecdote={anecdote} addNew={addNew}/>
      <div>
        {notification && (
          <h3>{notification}</h3>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default App