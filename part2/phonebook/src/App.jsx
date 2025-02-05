import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data); // Actualizar estado con datos del servidor
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')


  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearchTerm(event.target.value)

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} ya existe en la agenda`)
      return
    }
    if (newNumber.trim() === '') {
      alert('El número no puede estar vacío')
      return
    }
    setPersons([...persons, { name: newName, number: newNumber }])
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      
      <div>
        Search: <input 
          value={searchTerm} 
          onChange={handleSearchChange}
          placeholder="Search contacts..."
        />
      </div>
        <h2>add new</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => ( 
          <li key={person.name}>
            {person.name} - {person.number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App