import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity, Text, View, Image, TextInput } from 'react-native'
import styles from '../utils/style_guide/LoginPageStyle'
import { api, loginAuthUrl } from '../utils/backend_configuration/BackendConfig'

function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [authenticated, setAuthenticated] = useState(localStorage.getItem(localStorage.getItem('authenticated') || false))

  const handleSubmit = (e) => {
    e.preventDefault()

    api.post(loginAuthUrl, {
      username: username,
      password: password
    }
    ).then(response =>
      // this.setState({ articleId: response.data.id })
      console.log('POST returned something')
    )

    /*
    if (account && account.password === password) {
      setauthenticated(true)
      localStorage.setItem('authenticated', true)
    } */
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
