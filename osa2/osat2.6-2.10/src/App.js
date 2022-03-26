import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const submitName = (e) => {
    e.preventDefault()
    setPersons(persons.concat({name: newName}))
    setNewName('')
    console.log(persons)
  }

  const ShowPersons = ( {persons} ) => {
    return (persons.map((person) => {
      return(<p key={person.name}> {person.name} </p>)
    }))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitName}>
        <div>
          name: <input value={newName} onChange={(e) => {setNewName(e.target.value)}}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ShowPersons persons={persons} />
    </div>
    
  )

}

export default App
