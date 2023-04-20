import React from 'react'
import AccountBasicInfoInputView from '../components/molecules/AccountBasicInfoInputView'
import UserBillingAddressInputView from '../components/atoms/UserBillingAddressInputView'
import { TouchableOpacity, Text, View, Image, TextInput } from 'react-native'
import styles from '../utils/style_guide/AccountDetailsInputPageStyle'
import validator from 'validator'
import { isValidPhoneNumber } from 'react-phone-number-input'
import PasswordValidate from '../utils/PasswordValidate'
import { setAccountData } from '../store/Slices/AccountDataSlice'
import { connect } from 'react-redux'

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
      selectedCountryName: this.props.selectedCountryName,
      selectedCountryCode: this.props.selectedCountryCode,
      selectedStateCode: this.props.selectedStateCode,
      selectedStateName: this.props.selectedStateName,
      selectedCityName: this.props.selectedCityName,
      addressLine1: this.props.addressLine1,
      addressLine2: this.props.addressLine2,
      zipCode: this.props.zipCode,
      firstNameEmpty: false,
      lastNameEmpty: false,
      emailEmpty: false,
      validEmail: true,
      telephoneEmpty: false,
      validTelephone: true,
      passwordEmpty: false,
      passwordsMatch: true,
      passwordFormatIncorrect: false,
      dateBirthEmpty: false,
      addressLine1Empty: false,
      countryEmpty: false,
      stateEmpty: false,
      cityEmpty: false,
      zipCodeEmpty: false
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

    if (this.state.firstName === undefined) {
      handleSubmitProceed = false
      this.setState({ firstNameEmpty: true })
    } else {
      handleSubmitProceed = true
      this.setState({ firstNameEmpty: false })
    }

    if (this.state.lastName === undefined) {
      handleSubmitProceed = false
      this.setState({ lastNameEmpty: true })
    } else {
      handleSubmitProceed = true
      this.setState({ lastNameEmpty: false })
    }

    if (this.state.dateBirth === undefined) {
      handleSubmitProceed = false
      this.setState({ dateBirthEmpty: true })
    } else {
      handleSubmitProceed = true
      this.setState({ dateBirthEmpty: false })
    }

    if (this.state.emailAddress === undefined) {
      handleSubmitProceed = false
      this.setState({ emailEmpty: true })
    } else {
      if (!validator.isEmail(this.state.emailAddress)) {
        handleSubmitProceed = false
        this.setState({ validEmail: false })
      } else {
        handleSubmitProceed = true
        this.setState({ validEmail: true })
      }

      handleSubmitProceed = true
      this.setState({ emailEmpty: false })
    }

    if (this.state.telephoneNumber === undefined) {
      handleSubmitProceed = false
      this.setState({ telephoneEmpty: true })
    } else {
      if (!isValidPhoneNumber(this.state.telephoneNumber)) {
        handleSubmitProceed = false
        this.setState({ validTelephone: false })
      } else {
        handleSubmitProceed = true
        this.setState({ validTelephone: true })
      }

      handleSubmitProceed = true
      this.setState({ telephoneEmpty: false })
    }

    if (this.state.password === undefined) {
      handleSubmitProceed = false
      this.setState({ passwordEmpty: true })
    } else {
      if (!PasswordValidate(this.state.password, this.state.confirmedPassword)) {
        handleSubmitProceed = false
        this.setState({ passwordsMatch: false })
      } else {
        handleSubmitProceed = true
        this.setState({ passwordsMatch: true })
      }

      if (!validator.isStrongPassword(this.state.password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      })) {
        handleSubmitProceed = false
        this.setState({ passwordFormatIncorrect: false })
      } else {
        handleSubmitProceed = true
        this.setState({ passwordFormatIncorrect: true })
      }

      handleSubmitProceed = true
      this.setState({ passwordEmpty: false })
    }

    if (this.state.addressLine1 === undefined) {
      handleSubmitProceed = false
      this.setState({ addressLine1Empty: true })
    } else {
      handleSubmitProceed = true
      this.setState({ addressLine1Empty: false })
    }

    if (this.state.selectedCountryName === undefined) {
      handleSubmitProceed = false
      this.setState({ countryEmpty: true })
    } else {
      handleSubmitProceed = true
      this.setState({ countryEmpty: false })
    }

    if (this.state.selectedStateName === undefined) {
      handleSubmitProceed = false
      this.setState({ stateEmpty: true })
    } else {
      handleSubmitProceed = true
      this.setState({ stateEmpty: false })
    }

    if (this.state.selectedCityName === undefined) {
      handleSubmitProceed = false
      this.setState({ cityEmpty: true })
    } else {
      handleSubmitProceed = true
      this.setState({ cityEmpty: false })
    }

    if (this.state.zipCode === undefined) {
      handleSubmitProceed = false
      this.setState({ zipCodeEmpty: true })
    } else {
      handleSubmitProceed = true
      this.setState({ zipCodeEmpty: false })
    }

    this.props.setAccountData(this.state)

    // REMOVE THIS LATER
    // console.log(this.state)
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
          firstNameEmpty={this.state.firstNameEmpty}
          lastNameEmpty={this.state.lastNameEmpty}
          dateBirthEmpty={this.state.dateBirthEmpty}
          emailEmpty={this.state.emailEmpty}
          validEmail={this.state.validEmail}
          telephoneEmpty={this.state.telephoneEmpty}
          validTelephone={this.state.validTelephone}
          passwordsMatch={this.state.passwordsMatch}
          passwordFormatIncorrect={this.state.passwordFormatIncorrect}
          passwordEmpty={this.state.passwordEmpty}
        />
        <br></br>
        <UserBillingAddressInputView
          selectedCountryGrabber={this.selectedCountryGrabber.bind(this)}
          selectedStateGrabber={this.selectedStateGrabber.bind(this)}
          selectedCityGrabber={this.selectedCityGrabber.bind(this)}
          addressLine1Grabber={this.addressLine1Grabber.bind(this)}
          addressLine2Grabber={this.addressLine2Grabber.bind(this)}
          zipCodeGrabber={this.zipCodeGrabber.bind(this)}
          addressLine1Empty={this.state.addressLine1Empty}
          countryEmpty={this.state.countryEmpty}
          stateEmpty={this.state.stateEmpty}
          cityEmpty={this.state.cityEmpty}
          zipCodeEmpty={this.state.zipCodeEmpty}
        />
        <br></br>
        <TouchableOpacity style={styles.submitBtn} onPress={this.handleSubmit}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAccountData: (value) => dispatch(setAccountData(value))
  }
};
export default connect(null, mapDispatchToProps)(AccountCreationPage)
