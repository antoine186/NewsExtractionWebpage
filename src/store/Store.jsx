import { configureStore } from '@reduxjs/toolkit'
import userSessionReducer from './Slices/UserSessionSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux'
import AccountDataReducer from './Slices/AccountDataSlice'
import StripeCustomerIdReducer from './Slices/StripeCustomerIdSlice'
import StripeSubscriptionReducer from './Slices/StripeSubscriptionSlice'
import ValidSubscriptionReducer from './Slices/ValidSubscriptionSlice'
import subscriptionAlreadyCreatedReducer from './Slices/subscriptionAlreadyCreatedSlice'

const rootReducer = combineReducers({
  userSession: userSessionReducer,
  accountData: AccountDataReducer,
  stripeCustomerId: StripeCustomerIdReducer,
  stripeSubscription: StripeSubscriptionReducer,
  validSubscription: ValidSubscriptionReducer,
  subscriptionAlreadyCreated: subscriptionAlreadyCreatedReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whiteList: [
    'userSession',
    'accountData',
    'stripeCustomerId',
    'stripeSubscription',
    'validSubscription',
    'subscriptionAlreadyCreated'
  ]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)
