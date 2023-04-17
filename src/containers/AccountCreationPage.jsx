import React from 'react'
import AccountBasicInfoInputView from '../components/molecules/AccountBasicInfoInputView'
import styles from '../utils/style_guide/AccountCreationPageStyle'
import { TouchableOpacity, Text, View, Image, TextInput } from 'react-native'
// import PhoneInput from 'react-phone-number-input'
// import 'react-phone-number-input/style.css'

class AccountCreationPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  render () {
    return (
        <AccountBasicInfoInputView />
    )
  }
}

export default AccountCreationPage
