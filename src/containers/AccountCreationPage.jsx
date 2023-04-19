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
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      emailAddress: this.props.emailAddress,
      password: this.props.password,
      confirmedPassword: this.props.confirmedPassword,
      dateBirth: this.props.dateBirth,
      telephoneNumber: this.props.telephoneNumber
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  firstNameGrabber (firstName) {
    this.setState({ firstName })
  }

  lastNameGrabber (lastName) {
    this.setState({ lastName })
  }

  userEmailGrabber (email) {
    this.setState({ email })
  }

  passwordGrabber (password) {
    this.setState({ password })
  }

  confirmedPasswordGrabber (password) {
    this.setState({ confirmedPassword: password })
  }

  dateBirthGrabber (dateBirth) {
    this.setState({ dateBirth })
  }

  telNumberGrabber (telephoneNumber) {
    this.setState({ telephoneNumber })
  }

  handleSubmit () {
    console.log(this.state.firstName)
  }

  render () {
    return (
      <View style={styles.container}>
        <AccountBasicInfoInputView
          firstNameGrabber={this.firstNameGrabber.bind(this)}
          lastNameGrabber={this.lastNameGrabber.bind(this)}
          userEmailGrabber={this.userEmailGrabber.bind(this)}
          passwordGrabber={this.passwordGrabber.bind(this)}
          confirmedPasswordGrabber={this.confirmedPasswordGrabber.bind(this)}
          dateBirthGrabber={this.dateBirthGrabber.bind(this)}
          telNumberGrabber={this.telNumberGrabber.bind(this)}
        />
        <br></br>
        <UserBillingAddressInputView />
        <br></br>
        <UserPaymentAndBillingInputView />
        <TouchableOpacity style={styles.submitBtn} onPress={this.handleSubmit}>
          <Text style={styles.loginText}>Create</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default AccountCreationPage
