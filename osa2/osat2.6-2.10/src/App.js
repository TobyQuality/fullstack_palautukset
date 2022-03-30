import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import ShowPersons from './components/ShowPersons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  //käärin tähän muuttujaan propseina välitettävät arvot, joita tarvitaan PersonForm-komponentissa
  const propslist = {persons, setPersons, newName, setNewName, newNumber, setNewNumber}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h2>add a new</h2>
      <PersonForm propslist={propslist}/>
      <h2>Numbers</h2>
      <ShowPersons persons={persons} newFilter={newFilter} />
    </div>
  )

}

export default App
