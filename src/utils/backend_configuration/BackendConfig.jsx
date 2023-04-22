import axios from 'axios'

export const backendUrl = 'http://localhost:80/api'
// export const backendUrl = 'http://ec2-18-217-184-225.us-east-2.compute.amazonaws.com:5000/api'
export const loginAuthUrl = '/auth-login'
export const sessionAuthUrl = '/session-validate'
export const searchUrl = '/search'
export const basicAccountCreateUrl = '/basic-account-create'

export const api = axios.create({
  baseURL: backendUrl
})
