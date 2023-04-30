import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import EmotionalSearchPage from '../containers/EmotionalSearchPage'
import Login from '../containers/Login'
import { registerRootComponent } from 'expo'
import { store, persistor } from '../store/Store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import AccountCreationPage from '../containers/AccountCreationPage'
import PaymentPage from '../containers/PaymentPage'
import Completion from '../components/atoms/Completion'
import SessionController from '../components/atoms/SessionController'

function App () {
  return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <React.StrictMode>
                    <HashRouter>
                        <Routes>
                            <Route path="/" element={<EmotionalSearchPage />} />
                            <Route index element={<EmotionalSearchPage />} />
                            <Route path="login" element={<Login />} />
                            <Route path="account-create" element={<AccountCreationPage />}/>
                            <Route path="payment" element={<PaymentPage />} />
                            <Route path="completion" element={<Completion />}/>
                        </Routes>
                    </HashRouter>
                </React.StrictMode>
            </PersistGate>
            <SessionController />
        </Provider>
  )
}

export default registerRootComponent(App)
