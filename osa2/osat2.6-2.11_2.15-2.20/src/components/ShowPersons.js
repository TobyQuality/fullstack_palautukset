//saa App-tasolta propsina puhelinluettelon listan persons ja filtteröintiä varten merkkijonon newFilter
const ShowPersons = ({ persons, newFilter }) => {
    const filteredList = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    console.log(filteredList.length)
    return (
      <div>
        {filteredList.map( (person) => 
          <p key={person.name}>{person.name} {person.number}</p>
        )}
      </div>
    )
  }
  
  export default ShowPersons