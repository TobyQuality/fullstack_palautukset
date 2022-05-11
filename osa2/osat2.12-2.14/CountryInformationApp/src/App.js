import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

//Component for showing countries/country on App, depending on what's written in the filter field
//If 10 or less and more than 1 results, a list of countries is shown along with buttons that show details about said countries
const ShowCountries = ({propsList}) => {
  const {countries, filterString, setFilterString, capital, setCapital, weather, setWeather} = propsList

  //FilteredCountries list changes according to changes in the filter field (value stored in filterString state).
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filterString.toLowerCase()))
  //console.log(countries); //console.log(filterCountries); //console.log(filterCountries.length)
  
  //The individual api key will be given in Shell when starting the app via NPM 
  //Needed to fetch weather info from OpenWeather.org
  const api_key = process.env.REACT_APP_API_KEY

  //useEffect is used only when one country appears in filteredCountries list and specifically when when the state of {capital} changes.
  //Used for fetching weather info from OpenWeather.org
  useEffect(() => {
    const fetchWeather = () => {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${capital}&appid=${api_key}&units=metric`)
      .then(response => {
        //console.log("RESPONSE: ", response);
        return response.data.list[0];
      })
      .then(latestWeatherInfo => {
        //console.log("LATEST WEATHER INFO: ", latestWeatherInfo);
        //console.log("TEMPERATURE: ", latestWeatherInfo.main.temp, "ICON SOURCE: ", latestWeatherInfo.weather[0].icon, "WIND SPEED: ",latestWeatherInfo.wind.speed)
        setWeather({temperature: latestWeatherInfo.main.temp, icon: latestWeatherInfo.weather[0].icon, wind: latestWeatherInfo.wind.speed});
      })
      .catch((error) => {
        console.log(error)
      })
    };
    fetchWeather();
  }, [capital])

  if (filterString===""){return(<div></div>)}

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    setCapital(country.capital[0])
    //console.log(weather);

    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>
          <p>Capital: {capital}</p>
          <p>Area: {country.area} km²</p>
        </div>
        <h3>Languages:</h3>
        <ul>
          {Object.entries(country.languages).map(language => { 
            //console.log(language); //console.log(Object.keys(language)); //console.log(Object.values(language)); //console.log("key:", language[0], "/ value:", language[1]);
            return <li key={language[0]}> {language[1]} </li>
          })}
        </ul>
        <div>
          <img src={country.flags.png} alt={`The flag of ${country.name.common}`}/>
        </div>
          <h2>Weather in {capital}</h2>
          <p>Temperature {weather.temperature} Celsius</p>
          <img src= {`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="weather icon"/>
          <p>Wind {weather.wind} m/s</p>
        </div>)
      }
 
  if (filteredCountries.length <= 10) {
    const style = {display: "inline-block"}
    return (
    <div>
      {filteredCountries.map(country => 
        <div key={country.name.common}>
          <p style={style}>{country.name.common}</p>
          <button style={style} onClick={() => {setFilterString(country.name.common)}}>show</button>
        </div> 
      )}
    </div>)
    }
    
  //if over 10 matches the following text appears
  return (
    <div>
      Too many matches, specify another filter
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [filterString, setFilterString] = useState('')
  const [capital, setCapital] = useState('')
  const [weather, setWeather] = useState({temperature: 0, icon: '', wind: 0})

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  } ,[])
  //console.log(countries)
  const propsList = {countries, filterString, setFilterString, capital, setCapital, weather, setWeather}

  return (
    <div>
      <div>
        find countries
        <input value={filterString} onChange={(e) => setFilterString(e.target.value)}/>
      </div>
      <ShowCountries propsList = {propsList} />
    </div>
  )
}

export default App