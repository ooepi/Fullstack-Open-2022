const Country = ({ country, setFilter}) => {
    return (
      <li>
        {country.name.common}
        <button onClick={() => setFilter(country.name.common)}>show</button>
      </li>
    )
}

export default Country