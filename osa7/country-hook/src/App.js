import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const fetchCountry = async (name) => {
    if (name !== null) {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        if (response.status === 200) {
          const body = response.data[0]
          setCountry({
            name: body.name.common,
            capital: body.capital[0],
            population: body.population,
            flag: body.flags.png,
            found: true,
          })
        }
      } catch {
        setCountry({found: false})
      }
    }
  }

  useEffect( () => {
    fetchCountry(name)
  }, [name] )
  return country
}


const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState(null)
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <h1>Country information app</h1>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} />
    </div>
  )
}

export default App