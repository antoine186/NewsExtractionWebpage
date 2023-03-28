export const ADD_USER_SESSION = 'ADD_USER_SESSION'

// let userSession = {}

export const addAuthenticatedUserSession = task => ({
  type: ADD_USER_SESSION,
  payload: {
    task
  }
})
