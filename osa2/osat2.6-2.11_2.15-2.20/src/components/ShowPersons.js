import contactService from '../services/contacts'
//saa App-tasolta propsina puhelinluettelon listan persons ja filtteröintiä varten merkkijonon newFilter
const ShowPersons = ({ persons, setPersons, newFilter }) => {
    const filteredList = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    //console.log(filteredList.length)
    const handleDelete = (id, name) => {
      if (window.confirm("Delete " + name + "?")) {
        contactService.deleteContact(id)
        .then(response => {
          //console.log(response)
          const newList = persons.filter(person => person.id !== id)
          setPersons(newList)
        })
        .catch(error => {
          console.log(error)
        })
      }
    }

    const style = {display: "inline-block"}

    return (
      <div>
        {filteredList.map(person => 
          <div key={person.id}>
            <p style={style}>{person.name} {person.number}</p>
            <button onClick={() => {handleDelete(person.id, person.name)}}>delete</button>
          </div>
        )}
      </div>
    )
  }
  
  export default ShowPersons