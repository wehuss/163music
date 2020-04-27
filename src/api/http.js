import axios from 'axios'
import {apiUrl} from './config'

export default axios.create({
  baseURL: apiUrl,
  timeout: 8000,
  headers: {},
  withCredentials: true
})
