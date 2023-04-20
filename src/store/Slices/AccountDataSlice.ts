import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AccountDataState {
  accountData: object
}

const initialState: AccountDataState = {
  accountData: {},
}

export const AccountDataSlice = createSlice({
  name: 'accountData',
  initialState,
  reducers: {
    setAccountData: (state) => {
      state.accountData = state
    },
    clearAccountData: (state) => {
      state.accountData = state
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAccountData, clearAccountData } = AccountDataSlice.actions

export default AccountDataSlice.reducer
