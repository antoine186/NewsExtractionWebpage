import React, { useState } from 'react'
// import Dashboard from './Dashboard'
// import EmotionalSearchPage from './EmotionalSearchPage'
import { Button, StyleSheet, Text, View, Dimensions, TextInput } from 'react-native'

function Login () {
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const [authenticated, setAuthenticated] = useState(localStorage.getItem(localStorage.getItem('authenticated') || false))

  const handleSubmit = (e) => {
    e.preventDefault()

    if (account && account.password === password) {
      setauthenticated(true)
      localStorage.setItem('authenticated', true)
    }
  }

  return (
        <View>
            <Text>Login</Text>
        </View>
  )
}

/*
<form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    name="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" value="Submit" />
            </form> 
*/

export default Login
