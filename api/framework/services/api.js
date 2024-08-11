import axios from 'axios'
import { objectConfig } from '../config/config'

export const objectsApi = axios.create({
    baseURL: objectConfig.baseURL,
    validateStatus: () => true,
  })
  objectsApi.defaults.headers.common['Content-Type'] = 'application/json'