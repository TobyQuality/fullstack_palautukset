const PersonForm = ({propslist}) => {

  const {persons, setPersons, newName, setNewName, newNumber, setNewNumber} = propslist

    //funktio lomakkeen submittausta varten
    const submitName = (e) => {
        e.preventDefault()
        const found = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        //console.log(persons[0].name, newName, found, newNumber)
        if (found === undefined) {
          setPersons(persons.concat({name: newName, number: newNumber}))
          setNewName('')
          setNewNumber('')
        }
        else {
          window.alert(`${newName} is already added to phonebook`)
          setNewName('')
          setNewNumber('')
        }
        //console.log(persons)
      }
    
      const handleNewNumber = (e) => {
        //viimeisin syötetty merkki otetaan talteen, eli merkkijonon viimeisin indeksi = merkkijonon pituus - 1
        const lastCharacter = e.target.value[e.target.value.length - 1]
        //console.log(newCharacter)
        //console.log(!(isNaN(newCharacter)))
        // Jos tekstikentän arvo on muu kuin numero , "+""  tai "-"" niin kentän arvo ei päivity
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