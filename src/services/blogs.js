import axios from 'axios'
import { getToken } from './login'
const baseUrl = '/api/blogs'

const token = getToken()

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async updateObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(baseUrl + '/' + updateObject.id, updateObject, config)
  return response.data
}

const deleteBlog = async deleteId => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(baseUrl + '/' + deleteId, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, create, update, deleteBlog }
