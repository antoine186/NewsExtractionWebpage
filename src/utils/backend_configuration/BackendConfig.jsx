import axios from 'axios'

export const backendUrl = 'http://127.0.0.1:5000/'
export const loginAuthUrl = '/auth-login'

export const api = axios.create({
  baseURL: backendUrl
})
