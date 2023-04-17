import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import EmotionalSearchPage from '../containers/EmotionalSearchPage'
import Login from '../containers/Login'
import { registerRootComponent } from 'expo'
import { store, persistor } from '../store/Store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import AccountCreationPage from '../containers/AccountCreationPage'

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
                        </Routes>
                    </HashRouter>
                </React.StrictMode>
            </PersistGate>
        </Provider>
  )
}

export default registerRootComponent(App)
