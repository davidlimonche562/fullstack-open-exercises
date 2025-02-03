import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number : '0412-7993526'
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');

const handleNameChange = (event) =>{

  setNewName(event.target.value)
}

const handleNumberChange = (event) =>{
  console.log(event.target.value)
  setNewNumber(event.target.value)
}


const addPerson = (event) =>{
  event.preventDefault()
  const nameExists = persons.some(persons => persons.name === newName)
  if(nameExists){
    alert(`${newName} ya existe en la agenda`);
    return
  }
  if (newNumber.trim() === '') {
    alert('El número no puede estar vacío');
    return;
  }
  const newPerson = {
    name: newName,
    number: newNumber
  }
setPersons([...persons,newPerson])
setNewName('')
setNewNumber('')
}

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(persons =>(
        <li key={persons.name}>{persons.name} {persons.number}</li>
        ))}
      </ul>
    </div>
  )
}

export default App