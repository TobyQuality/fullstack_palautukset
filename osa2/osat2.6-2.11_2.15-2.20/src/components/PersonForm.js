import contactService from '../services/contacts'

const PersonForm = ({propslist}) => {

  const {persons, setPersons, newName, setNewName, newNumber, setNewNumber, setMessage, message} = propslist
    //funktio lomakkeen submittausta varten
    const submitName = (e) => {
        e.preventDefault()
        const found = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        //console.log(persons[0].name, newName, found, newNumber)
        if (found === undefined) {
          const person = {name: newName, number: newNumber}
          contactService
            .create(person)
              .then(returnedPerson => {
                setMessage({...message, msg: `'${returnedPerson.name}' was succesfully added to the list`})
                setTimeout(() => { setMessage({...message, msg: ''}) }, 5000)
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
              })
              .catch(error => {
                console.log(error)
                setMessage({msg: `'${person.name}' has already been added`, colorCode: 'red'})
                setTimeout(() => {setMessage({msg: '', colorCode: 'green'})}, 5000)
              })
        }
        else {
          if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            const changedPerson = { ...found, number : newNumber}
            contactService.update(found.id, changedPerson).then(response => {
                //console.log(response)
                setMessage({ ...message, msg: `The number of '${changedPerson.name}' was succesfully updated` })
                setTimeout(() => { setMessage( {...message, msg: ''} ) }, 5000)
                setPersons(persons.map(person => person.id !== found.id ? person : changedPerson))
                setNewName('')
                setNewNumber('')
              })
              .catch(error => {
                console.log(error)
                setMessage({msg: `Updating failed unexpectedly, please try again`, colorCode: 'red'})
                setTimeout(() => {setMessage({msg: '', colorCode: 'green'})}, 5000)
              })
          }
        }
        //console.log(persons)
      }
    
      const handleNewNumber = (e) => {
        //viimeisin syötetty merkki otetaan talteen, eli merkkijonon viimeisin indeksi = merkkijonon pituus - 1
        const lastCharacter = e.target.value[e.target.value.length - 1]
        //console.log(newCharacter)
        //console.log(!(isNaN(newCharacter)))
        // Jos tekstikentän arvo on muu kuin numero , tai merkit "+" ja "-", niin kentän arvo ei päivity
        if ( !(isNaN(lastCharacter)) || lastCharacter === '-' || lastCharacter === '+') {
          setNewNumber(e.target.value)
        }
      }

    return (
        <form onSubmit={submitName}>
            <div>
                name: <input value={newName} onChange={(e) => {setNewName(e.target.value)}}/>
            </div>
            <div>
                number: <input id="numberInput" value={newNumber} onChange={handleNewNumber}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm