import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

const ShowCountries = (props) => {
  const filterCountries = props.countries.filter(country => props.filter.toLowerCase() === country.name.common.toLowerCase())
  console.log(props.countries)
  console.log(filterCountries)
  console.log(filterCountries.length)

  if (filterCountries.length > 10) {
    return (<div><p>"Too many matches, specify another filter"</p></div>)
  }
  
    //tarvitaan filtteriä, joka muuttuu aina kentän merkkijonon myötä, joka filtteröi countries-muuttujaa
    //kun kenttään tulee tekstiä, muuttuu tila, eli linkki country-tilaan
    //kentän tekstiä pitää verrata countries-tilaan, eli siihenkin linkki
    //lopulta showCountry tilaa käytetään

    //if x > 10 return: "liikaa hakutuloksia"
    //if x >= 10 return: Maiden nimet
    //if x === 1 return: Kaikki tarvittavat tiedot ym.
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [showCountry, setshowCountry] = useState({name:'', capital:'', area:'', languages:'', flag: null})

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  } ,[])
  //console.log(countries)

  return (
    <div>
      <div>
        find countries
        <input value={filter} onChange={(e) => setFilter(e.target.value)}/>
      </div>
      <ShowCountries countries={countries} filter={filter} />
    </div>
  )
}

export default App
