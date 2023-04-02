import React, { useState, useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity, Text, View, Image, TextInput } from 'react-native'
import styles from '../utils/style_guide/LoginPageStyle'
import { api, loginAuthUrl } from '../utils/backend_configuration/BackendConfig'
import { useDispatch } from 'react-redux'
import { addAuthenticatedUserSession } from '../store/actions/UserSessionActions'
import CookieSessionChecker from '../utils/CookiesSessions/CookieSessionChecker'

function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    if (CookieSessionChecker()) {
      console.log('Session confirmed')
    } else {
      console.log('Session absent')
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    api.post(loginAuthUrl, {
      username: username,
      password: password
    }, {
      withCredentials: true
    }
    ).then(response => {

      // dispatch(addAuthenticatedUserSession(response.data))
    }
    )
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/images/EMOfficialLogo.png')} />
      <Text style={styles.company_name}>Emotional Machines</Text>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setUsername(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login
