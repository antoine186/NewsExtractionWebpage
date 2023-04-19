import React from 'react'
import AccountBasicInfoInputView from '../components/molecules/AccountBasicInfoInputView'
import UserBillingAddressInputView from '../components/atoms/UserBillingAddressInputView'
import UserPaymentAndBillingInputView from '../components/atoms/UserPaymentAndBillingInputView'
import { TouchableOpacity, Text, View, Image, TextInput } from 'react-native'
import styles from '../utils/style_guide/AccountDetailsInputPageStyle'

class AccountCreationPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <AccountBasicInfoInputView />
        <br></br>
        <UserBillingAddressInputView />
        <br></br>
        <UserPaymentAndBillingInputView />
      </View>
    )
  }
}

export default AccountCreationPage
