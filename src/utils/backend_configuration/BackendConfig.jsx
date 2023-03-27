import axios from 'axios'
import React from 'react'

const backendUrl = 'http://127.0.0.1:5000/'
const loginAuthUrl = '/auth-login'

const api = axios.create({
  baseURL: backendUrl
})
