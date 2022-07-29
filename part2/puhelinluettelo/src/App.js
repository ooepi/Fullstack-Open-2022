import {useState, useEffect} from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState()
  const [messageType, setMessageType] = useState()

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
          }, 200)
      }

      setMessageType('info')
      setMessage(`Changed number of ${newName} to ${newNumber}`)
      
      setNewName('')
      setNewNumber('')
  
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      return

    } else if (persons.some(person=> person.name === newName && person.number === newNumber)){

      setMessageType('error')
      setMessage(`${newName} already has the number ${newNumber}`)
      
      setNewName('')
      setNewNumber('')
  
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })

    setMessageType('info')
    setMessage(`Added ${newName}`)
    
    setNewName('')
    setNewNumber('')

    setTimeout(() => {
      setMessage(null)
    }, 5000)

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

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(returnedPerson => {
          persons.map(person => person.id !== id ? person : returnedPerson)
          setMessageType('info')
          setMessage(`Information of ${name} has been removed`)
        })
        .catch(error => {
          setMessageType('error')
          setMessage(`Information of ${name} has already been removed from the server`)
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().match(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} type={messageType}/>
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