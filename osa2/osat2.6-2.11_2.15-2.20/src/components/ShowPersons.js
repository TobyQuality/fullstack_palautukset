import contactService from '../services/contacts'
const ShowPersons = ({ persons, setPersons, newFilter, setMessage, message }) => {
  const filteredList = persons.filter(person => person.name?.toLowerCase().includes(newFilter?.toLowerCase()))
    const handleDelete = (id, name) => {
      if (window.confirm("Delete " + name + "?")) {
        contactService.deleteContact(id)
        .then(response => {
          setMessage({...message, msg: `'${name}' was succesfully deleted`})
          setTimeout(() => {setMessage({...message, msg: ''})}, 5000)
          const newList = persons.filter(person => person.id !== id)
          setPersons(newList)
        })
        .catch(error => {
          console.log(error)
          setMessage({msg: `Information of '${name}' has already been removed`, colorCode: 'red'})
          setTimeout(() => {setMessage({msg: '', colorCode: 'green'})}, 5000)
        })
      }
    }

    return (
      <div>
        {filteredList.map(person => 
          <div key={person.id}>
            <p style={ {display: "inline-block"} }>{person.name} {person.number}</p>
            <button onClick={() => {handleDelete(person.id, person.name)}}>delete</button>
          </div>
        )}
      </div>
    )
  }
  
  export default ShowPersons