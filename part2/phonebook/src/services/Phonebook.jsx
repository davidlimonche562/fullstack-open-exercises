import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons' // Asegúrate que el puerto sea 3001

const getAll = () => {
return axios.get(baseUrl).then(response => response.data)
}

const create = (newPerson) => {
return axios.post(baseUrl, newPerson).then(response => response.data)
}

const deleteEntry = (id) => {
axios.delete(`${baseUrl}/${id}`)
}

const update = (id, updatedPerson) => {
    return axios.put(`${baseUrl}/${id}`, updatedPerson).then(response => response.data)
}

export default { getAll,create,deleteEntry , update}