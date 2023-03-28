import { ADD_USER_SESSION } from '../actions/UserSessionActions'

const initialState = {
  userSession: []
}

const userSessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_SESSION: {
      const { task } = action.payload
      return {
        ...state,
        userSession: [...state.userSession, { task }]
      }
    }
    default:
      return state
  }
}

export default userSessionReducer
