import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmotionalSearchPage from '../containers/EmotionalSearchPage'
import Login from '../containers/Login'
import { registerRootComponent } from 'expo'
import Store from '../store/Store'
import { Provider } from 'react-redux'

function App () {
  return (
        <Provider store={Store}>
            <React.StrictMode>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route index element={<Login />} />
                        <Route path="search" element={<EmotionalSearchPage />} />
                    </Routes>
                </BrowserRouter>
            </React.StrictMode>
        </Provider>
  )
}

export default registerRootComponent(App)
