import Country from './Country'
import CountryDetails from './CountryDetails'

const CountryList = ({listOfCountries, setFilter}) => {
    if (listOfCountries.length > 10) {
      return('Too many matches, specift another filter')
    } else if (listOfCountries.length < 11 && listOfCountries.length > 1) {
      return(
        <ul>
        {listOfCountries.map(country => 
          <Country key={country.name.common} country={country} setFilter={setFilter}/>
        )}
      </ul>
      )
    } else if (listOfCountries.length === 1) {
      return(
        <CountryDetails country={listOfCountries[0]}/>
      )
    }
  }

  export default CountryList