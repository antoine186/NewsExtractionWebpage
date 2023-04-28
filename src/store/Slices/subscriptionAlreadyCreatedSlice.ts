import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SubscriptionAlreadyCreatedState {
  subscriptionAlreadyCreated: boolean
}

const initialState: SubscriptionAlreadyCreatedState = {
  subscriptionAlreadyCreated: false,
}

export const subscriptionAlreadyCreatedSlice = createSlice({
  name: 'subscriptionAlreadyCreated',
  initialState,
  reducers: {
    setSubscriptionAlreadyCreated: (state) => {
      state.subscriptionAlreadyCreated = true
    },
    clearSubscriptionAlreadyCreated: (state) => {
      state.subscriptionAlreadyCreated = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSubscriptionAlreadyCreated, clearSubscriptionAlreadyCreated } = subscriptionAlreadyCreatedSlice.actions

export default subscriptionAlreadyCreatedSlice.reducer
