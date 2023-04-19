import React from 'react'
import AccountBasicInfoInputView from '../components/molecules/AccountBasicInfoInputView'
import UserBillingAddressInputView from '../components/atoms/UserBillingAddressInputView'
import UserPaymentAndBillingInputView from '../components/atoms/UserPaymentAndBillingInputView'
import { TouchableOpacity, Text, View, Image, TextInput } from 'react-native'
import styles from '../utils/style_guide/AccountDetailsInputPageStyle'
import validator from 'validator'
import { isValidPhoneNumber } from 'react-phone-number-input'
import PasswordValidate from '../utils/PasswordValidate'

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
      telephoneNumber: this.props.telephoneNumber,
      selectedCountryName: '',
      selectedCountryCode: '',
      selectedStateCode: '',
      selectedStateName: '',
      selectedCityName: '',
      addressLine1: this.props.addressLine1,
      addressLine2: this.props.addressLine2,
      zipCode: this.props.zipCode
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
    this.setState({ emailAddress: email })
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

  selectedCountryGrabber (selectedCountryName, selectedCountryCode) {
    this.setState({ selectedCountryName })
    this.setState({ selectedCountryCode })
  }

  selectedStateGrabber (selectedStateName, selectedStateCode) {
    this.setState({ selectedStateName })
    this.setState({ selectedStateCode })
  }

  selectedCityGrabber (selectedCityName) {
    this.setState({ selectedCityName })
  }

  addressLine1Grabber (addressLine1) {
    this.setState({ addressLine1 })
  }

  addressLine2Grabber (addressLine2) {
    this.setState({ addressLine2 })
  }

  zipCodeGrabber (zipCode) {
    this.setState({ zipCode })
  }

  handleSubmit () {
    let handleSubmitProceed = true

    if (!validator.isEmail(this.state.emailAddress)) {
      handleSubmitProceed = false
    }
    if (!isValidPhoneNumber(this.state.telephoneNumber)) {
      handleSubmitProceed = false
    }
    if (!PasswordValidate(this.state.password, this.state.confirmedPassword)) {
      handleSubmitProceed = false
    }
    if (!validator.isStrongPassword(this.state.password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })) {
      handleSubmitProceed = false
    }

    // REMOVE THIS LATER
    console.log(this.state)
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
        <UserBillingAddressInputView
          selectedCountryGrabber={this.selectedCountryGrabber.bind(this)}
          selectedStateGrabber={this.selectedStateGrabber.bind(this)}
          selectedCityGrabber={this.selectedCityGrabber.bind(this)}
          addressLine1Grabber={this.addressLine1Grabber.bind(this)}
          addressLine2Grabber={this.addressLine2Grabber.bind(this)}
          zipCodeGrabber={this.zipCodeGrabber.bind(this)}
        />
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
