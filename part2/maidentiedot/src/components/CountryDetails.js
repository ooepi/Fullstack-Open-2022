import axios from 'axios'
import {useState, useEffect} from 'react'


const CountryDetails = ({country}) => {
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`)
    .then(promise => setWeather(promise.data))
  }, [])

  if (weather.name){
    return(
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <b>Languages:</b>
        <ul>
        {Object.keys(country.languages).map(key =>
            <li key={key}>{country.languages[key]}</li>
        )}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      
        <h2>Weather in {country.capital}</h2>
        <p>Tepmerature {(weather.main.temp + -272.15).toFixed(1)} °C </p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0].description}`} />
        <p>Wind {weather.wind.speed} m/s</p>
      </div>
    )
  }
}

export default CountryDetails
