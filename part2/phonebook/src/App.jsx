import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

const handleNameChange = (event) =>{
  console.log(event.target.value)
  setNewName(event.target.value)
}

const addPerson = (event) =>{
  event.preventDefault()
  const nameExists = persons.some(persons => persons.name === newName)
  if(nameExists){
    alert(`${newName} ya existe en la agenda`);
    return
  }
  const newPersone = {
    name: newName
  }
setPersons([...persons,newPersone])
setNewName('')
}

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(persons =>(
        <li key={persons.name}>{persons.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App