export const ADD_USER_SESSION = 'ADD_USER_SESSION'

export const addAuthenticatedUserSession = session => ({
  type: ADD_USER_SESSION,
  payload: {
    session
  }
})
