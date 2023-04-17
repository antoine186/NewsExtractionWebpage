import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity, Text, View, Image, TextInput } from 'react-native'
import styles from '../utils/style_guide/LoginPageStyle'
import { api, loginAuthUrl } from '../utils/backend_configuration/BackendConfig'
import { useSelector, useDispatch } from 'react-redux'
import { validateUserSession } from '../store/Slices/UserSessionSlice'
import { useNavigate, Navigate } from 'react-router-dom'

function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passIncorrect, setPassIncorrect] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userSessionValidated = useSelector(state => state.userSession.validated)

  const loginButtonRef = React.useRef()

  window.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault()

      if (loginButtonRef.current !== undefined) {
        loginButtonRef.current.click()
      }
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    api.post(loginAuthUrl, {
      username: username,
      password: password
    }, {
      withCredentials: true
    }
    ).then(response => {
      if (response.data) {
        dispatch(validateUserSession())
        navigate('/')
      } else {
        setPassIncorrect(true)
      }
    }
    )
  }

  function accountCreate () {
    navigate('/account-create')
  }

  if (userSessionValidated) {
    return <Navigate to='/' />
  } else {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/images/EMOfficialLogo.png')} />
        <Text style={styles.companyName}>Emotional Machines</Text>
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setUsername(email)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        {passIncorrect &&
          <View>
            <Text style={styles.text}>
              Incorrect credentials
            </Text>
            <br></br>
          </View>
        }
        <TouchableOpacity>
          <Text style={styles.textButton}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.textButton} onPress={accountCreate}>
            {"Don't have an account? Create an account here"}
          </Text>
        </TouchableOpacity>
        <br></br>
        <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit} ref={loginButtonRef}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Login
