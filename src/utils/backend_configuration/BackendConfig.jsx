import axios from 'axios'

export const backendUrl = 'http://localhost:80/api'
export const loginAuthUrl = '/auth-login'
export const sessionAuthUrl = '/session-validate'
export const searchUrl = '/search'

export const api = axios.create({
  baseURL: backendUrl
})
