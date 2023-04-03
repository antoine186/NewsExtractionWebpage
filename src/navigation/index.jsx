import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmotionalSearchPage from '../containers/EmotionalSearchPage'
import Login from '../containers/Login'
import { registerRootComponent } from 'expo'
import { store, persistor } from '../store/Store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

function App () {
  return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <React.StrictMode>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<EmotionalSearchPage />} />
                            <Route index element={<EmotionalSearchPage />} />
                            <Route path="login" element={<Login />} />
                        </Routes>
                    </BrowserRouter>
                </React.StrictMode>
            </PersistGate>
        </Provider>
  )
}

export default registerRootComponent(App)
