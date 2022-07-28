import {useState, useEffect} from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  

  const AddPerson = (event) => {
    event.preventDefault()
    
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if (persons.some(person => person.name === newName && person.number !== newNumber)){
      if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {

        const person = persons.find(person => person.name === newName)

        personService
          .update(person.id, personObject)
          setTimeout(() => {
            personService
            .getAll()
            .then(initialPersons => {
              setPersons(initialPersons)
            })
          }, 100);  
      }
      setNewName('')
      setNewNumber('')
      return

    } else if (persons.some(person=> person.name === newName && person.number === newNumber)){
      alert(`${newName} already has the number ${newNumber}`)

      setNewName('')
      setNewNumber('')
      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (id) => {
    if (window.confirm(`Delete ${id}?`)) {
      personService
      .remove(id)
      .then(returnedPerson => {
        persons.map(person => person.id !== id ? person : returnedPerson)
      })
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().match(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange}/>

      <h2>Add a new</h2>

      <PersonForm 
        AddPerson={AddPerson}
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      
      <ul>
        {filteredPersons.map(person => 
          <Person key={person.id} person={person} handleDelete={handleDelete}></Person>
        )}
      </ul>
    </div>
  )
}

export default App