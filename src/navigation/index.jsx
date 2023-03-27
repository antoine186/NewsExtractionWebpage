import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmotionalSearchPage from '../containers/EmotionalSearchPage'
import Login from '../containers/Login'
import { registerRootComponent } from 'expo'

function App () {
  return (
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route index element={<Login />} />
                    <Route path="search" element={<EmotionalSearchPage />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
  )
}

export default registerRootComponent(App)
