import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import ShowPersons from './components/ShowPersons'
import contactService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')  

  //ensimmäisen renderöinnin yhteydessä ladataan json-serveriltä henkilölista
  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => setPersons(initialContacts))
      .catch(error => console.log(error))
  }, [])
  //console.log(persons)
  //käärin alla olevaan muuttujaan propseina välitettävät arvot, joita tarvitaan PersonForm-komponentissa
  const propslist = {persons, setPersons, newName, setNewName, newNumber, setNewNumber}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h2>add a new</h2>
      <PersonForm propslist={propslist} />
      <h2>Numbers</h2>
      <ShowPersons persons={persons} setPersons={setPersons} newFilter={newFilter} />
    </div>
  )

}

export default App