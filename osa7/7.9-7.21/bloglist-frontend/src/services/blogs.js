import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, { headers: { Authorization: token }, })
  return response.data
}

const update = async ({ updatedObject }) => {
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject.blog)
  return response.data
}

const remove = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: token }, })
  return response.data
}

export default { getAll, create, update, remove, setToken }