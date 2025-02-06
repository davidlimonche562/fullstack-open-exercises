import { useEffect, useState } from 'react'
import Phonebook from './services/Phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    Phonebook.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.error('Error cargando contactos:', error)
      })
  }, []) 

  const handleDeleteEntry = (id) => {
    const person = persons.find(p => p.id === id)
    if (person && window.confirm(`Delete ${person.name}?`)) {
      Phonebook.deleteEntry(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          console.error('Error deleting person:', error)
          alert('Could not delete the contact.')
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault();
  
    const existingPerson = persons.find(person => person.name === newName);
  
    if (existingPerson) {
      if (window.confirm(`${newName} ya existe en la agenda. ¿Quieres actualizar su número?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
  
        Phonebook.update(existingPerson.id, updatedPerson)
          .then(updatedData => {
            setPersons(persons.map(person => 
              person.id !== existingPerson.id ? person : updatedData
            ));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            console.error('Error actualizando el contacto:', error);
            alert('No se pudo actualizar el contacto.');
          });
      }
      return;
    }
  
    if (newNumber.trim() === '') {
      alert('El número no puede estar vacío');
      return;
    }
  
    const newPerson = { name: newName, number: newNumber };
  
    Phonebook.create(newPerson)
      .then(createdPerson => {
        setPersons([...persons, createdPerson]);
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.error('Error guardando contacto:', error);
        alert('No se pudo guardar el contacto');
      });
  };


  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearchTerm(event.target.value)

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h1>phonebook</h1>
      
      <div>
        Search: <input 
          value={searchTerm} 
          onChange={handleSearchChange}
          placeholder="Search contacts..."
        />
      </div>

      <h2>Add new</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => ( 
          <li key={person.id}>
            {person.name} - {person.number} 
            <button onClick={() => handleDeleteEntry(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App