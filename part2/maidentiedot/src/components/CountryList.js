import Country from "./Country"

const CountryList = ({listOfCountries}) => {
    if (listOfCountries.length > 10) {
      return('Too many matches, specift another filter')
    } else if (listOfCountries.length < 11 && listOfCountries.length > 1) {
      return(
        <ul>
        {listOfCountries.map(country => 
          <Country key={country.name.common} country={country}/>
        )}
      </ul>
      )
    } else if (listOfCountries.length === 1) {
      const country = listOfCountries[0]
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
          <img src={country.flags.png} alt="" />
        </div>
      )
    }
  }

  export default CountryList